import { createRoot, type Root } from "react-dom/client";
import type { IconProps } from "../DesktopIcons/DesktopIcons";
import Folder from "../Folder/Folder";

let highestZIndex = 1000;
let differential = 0;

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character
  );

export function openModal(icon: IconProps) {
  const existingModal = document.getElementById(`modal-${icon.id}`);

  if (existingModal) {
    highestZIndex += 1;
    existingModal.style.zIndex = `${highestZIndex}`;
    existingModal.style.visibility = "visible";
    document
      .getElementById(`taskbar-item-${icon.id}`)
      ?.classList.remove("minimized");
    return;
  }

  const safeId = escapeHtml(icon.id);
  const safeName = escapeHtml(icon.name);
  const safeImage = escapeHtml(icon.img);
  const safeUrl = escapeHtml(icon.url ?? "");
  const modal = document.createElement("section");
  let folderRoot: Root | undefined;

  modal.className = "modal";
  modal.id = `modal-${icon.id}`;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-label", icon.name);
  modal.innerHTML = `
    <header class="modal-header">
      <div class="modal-tab">
        <img src="${safeImage}" alt="" width="24" height="24">
        <h2>${safeName}</h2>
      </div>
      <div class="header-buttons">
        <button class="minimize-btn" type="button" title="Minimizar" aria-label="Minimizar ${safeName}">&#x2013;</button>
        <button class="maximize-btn" type="button" title="Maximizar" aria-label="Maximizar ${safeName}">&#x2610;</button>
        <button class="close-btn" type="button" title="Fechar" aria-label="Fechar ${safeName}">&#x2716;</button>
      </div>
    </header>
    ${
      icon.type === "folder"
        ? ""
        : `<div class="modal-address" aria-hidden="true">${safeUrl}</div>`
    }
    <div class="modal-content" id="modal-content-${safeId}">
      ${
        icon.type === "folder"
          ? ""
          : `<iframe id="iframe-${safeId}" src="${safeUrl}" title="${safeName}" loading="lazy" scrolling="yes"></iframe>`
      }
    </div>
    <div class="resize-grip resize-grip-top"></div>
    <div class="resize-grip resize-grip-bottom"></div>
    <div class="resize-grip resize-grip-left"></div>
    <div class="resize-grip resize-grip-right"></div>
    <div class="resize-grip resize-grip-top-left"></div>
    <div class="resize-grip resize-grip-top-right"></div>
    <div class="resize-grip resize-grip-bottom-left"></div>
    <div class="resize-grip resize-grip-bottom-right"></div>
  `;

  document.body.appendChild(modal);

  if (icon.type === "folder" && icon.content) {
    const modalContent = document.getElementById(`modal-content-${icon.id}`);
    if (modalContent) {
      folderRoot = createRoot(modalContent);
      folderRoot.render(<Folder content={icon.content} />);
    }
  }

  highestZIndex += 1;
  modal.style.zIndex = `${highestZIndex}`;

  const centerModal = (useCenter = false) => {
    const modifier = useCenter ? 0 : differential;
    const availableHeight = window.innerHeight - 56;
    const centeredLeft = (window.innerWidth - modal.offsetWidth) / 2 + modifier;
    const centeredTop = (availableHeight - modal.offsetHeight) / 2 + modifier;
    const maxLeft = Math.max(8, window.innerWidth - modal.offsetWidth - 8);
    const maxTop = Math.max(8, availableHeight - modal.offsetHeight - 8);

    modal.style.left = `${Math.min(Math.max(centeredLeft, 8), maxLeft)}px`;
    modal.style.top = `${Math.min(Math.max(centeredTop, 8), maxTop)}px`;
    differential = differential > 160 ? 0 : differential + 32;
  };

  centerModal();
  const handleResize = () => centerModal(true);
  window.addEventListener("resize", handleResize);

  const minimizeBtn = modal.querySelector<HTMLButtonElement>(".minimize-btn");
  const maximizeBtn = modal.querySelector<HTMLButtonElement>(".maximize-btn");
  const closeBtn = modal.querySelector<HTMLButtonElement>(".close-btn");
  const header = modal.querySelector<HTMLElement>(".modal-header");
  let isMaximized = false;

  minimizeBtn?.addEventListener("click", () => {
    modal.style.visibility = "hidden";
    document
      .getElementById(`taskbar-item-${icon.id}`)
      ?.classList.add("minimized");
  });

  maximizeBtn?.addEventListener("click", () => {
    isMaximized = !isMaximized;
    modal.classList.toggle("maximized", isMaximized);
    if (!isMaximized) centerModal(true);
  });

  closeBtn?.addEventListener("click", () => {
    window.removeEventListener("resize", handleResize);
    folderRoot?.unmount();
    modal.remove();
    document.getElementById(`taskbar-item-${icon.id}`)?.remove();
  });

  header?.addEventListener("mousedown", (event) => {
    if (isMaximized || (event.target as HTMLElement).closest("button")) return;

    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const { left, top } = modal.getBoundingClientRect();
    const shiftX = startX - left;
    const shiftY = startY - top;

    const onMouseMove = (moveEvent: globalThis.MouseEvent) => {
      requestAnimationFrame(() => {
        modal.style.left = `${moveEvent.clientX - shiftX}px`;
        modal.style.top = `${moveEvent.clientY - shiftY}px`;
      });
    };

    const onMouseUp = () => {
      modal.classList.remove("dragging");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    modal.classList.add("dragging");
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  modal.addEventListener("mousedown", () => {
    highestZIndex += 1;
    modal.style.zIndex = `${highestZIndex}`;
  });

  modal.querySelectorAll<HTMLElement>(".resize-grip").forEach((grip) => {
    grip.addEventListener("mousedown", (event) => initResize(event, grip));
  });

  addTaskbarItem(icon);

  function initResize(event: globalThis.MouseEvent, grip: HTMLElement) {
    if (isMaximized) return;

    modal.classList.add("dragging");
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = modal.offsetWidth;
    const startHeight = modal.offsetHeight;
    const startLeft = modal.offsetLeft;
    const startTop = modal.offsetTop;

    const doResize = (moveEvent: globalThis.MouseEvent) => {
      requestAnimationFrame(() => {
        const horizontalChange = moveEvent.clientX - startX;
        const verticalChange = moveEvent.clientY - startY;

        if (grip.classList.contains("resize-grip-right")) {
          modal.style.width = `${startWidth + horizontalChange}px`;
        }
        if (grip.classList.contains("resize-grip-bottom")) {
          modal.style.height = `${startHeight + verticalChange}px`;
        }
        if (grip.classList.contains("resize-grip-left")) {
          modal.style.width = `${startWidth - horizontalChange}px`;
          modal.style.left = `${startLeft + horizontalChange}px`;
        }
        if (grip.classList.contains("resize-grip-top")) {
          modal.style.height = `${startHeight - verticalChange}px`;
          modal.style.top = `${startTop + verticalChange}px`;
        }
        if (grip.classList.contains("resize-grip-top-left")) {
          modal.style.width = `${startWidth - horizontalChange}px`;
          modal.style.left = `${startLeft + horizontalChange}px`;
          modal.style.height = `${startHeight - verticalChange}px`;
          modal.style.top = `${startTop + verticalChange}px`;
        }
        if (grip.classList.contains("resize-grip-top-right")) {
          modal.style.width = `${startWidth + horizontalChange}px`;
          modal.style.height = `${startHeight - verticalChange}px`;
          modal.style.top = `${startTop + verticalChange}px`;
        }
        if (grip.classList.contains("resize-grip-bottom-left")) {
          modal.style.width = `${startWidth - horizontalChange}px`;
          modal.style.left = `${startLeft + horizontalChange}px`;
          modal.style.height = `${startHeight + verticalChange}px`;
        }
        if (grip.classList.contains("resize-grip-bottom-right")) {
          modal.style.width = `${startWidth + horizontalChange}px`;
          modal.style.height = `${startHeight + verticalChange}px`;
        }
      });
    };

    const stopResize = () => {
      modal.classList.remove("dragging");
      document.removeEventListener("mousemove", doResize);
      document.removeEventListener("mouseup", stopResize);
    };

    document.addEventListener("mousemove", doResize);
    document.addEventListener("mouseup", stopResize);
  }
}

function addTaskbarItem(icon: IconProps) {
  const taskbar = document.getElementById("open-windows");
  const taskbarItem = document.createElement("button");
  const safeName = escapeHtml(icon.name);
  const safeImage = escapeHtml(icon.img);

  taskbarItem.type = "button";
  taskbarItem.className = "taskbar-item";
  taskbarItem.id = `taskbar-item-${icon.id}`;
  taskbarItem.setAttribute("aria-label", `Alternar janela ${icon.name}`);
  taskbarItem.innerHTML = `
    <img src="${safeImage}" alt="" width="24" height="24">
    <span>${safeName}</span>
  `;

  taskbarItem.addEventListener("click", () => {
    const modal = document.getElementById(`modal-${icon.id}`);
    if (!modal) return;

    if (modal.style.visibility === "hidden") {
      highestZIndex += 1;
      modal.style.zIndex = `${highestZIndex}`;
      modal.style.visibility = "visible";
      taskbarItem.classList.remove("minimized");
    } else {
      modal.style.visibility = "hidden";
      taskbarItem.classList.add("minimized");
    }
  });

  taskbar?.appendChild(taskbarItem);
}
