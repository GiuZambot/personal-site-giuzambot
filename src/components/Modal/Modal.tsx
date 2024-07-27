import Folder from "../Folder/Folder";
import { createRoot } from "react-dom/client";
import { IconProps } from "../DesktopIcons/DesktopIcons";

let highestZIndex = 1000;
let differential = 0;

export function openModal(icon: IconProps) {
  const existingModal = document.getElementById(`modal-${icon.id}`)

  if (existingModal && existingModal.style.display !== 'none') {
    return
  } else if (existingModal && existingModal.style.display === 'none') {
    existingModal.style.display = 'block';
    highestZIndex++;
    existingModal.style.zIndex = `${highestZIndex}`;
    document.getElementById(`taskbar-item-${icon.id}`)?.classList
      .remove('minimized')
    return
  }

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.id = `modal-${icon.id}`;
  modal.innerHTML = `
    <div class="modal-header">
      <span class="curve-left"></span>
      <span>
        <img src="${icon.img}" alt="logo">
        <h3>${icon.name}</h3>
      </span>
      <span class="curve-right"></span>
      <span class="spacer"></span>
      <div class="header-buttons">
      <button class="minimize-btn" title="Minimizar">&#x2013;</button>
      <button class="maximize-btn" title="Maximizar">&#x2610;</button>
      <button class="close-btn" title="Fechar">&#x2716;</button>
      </div>
    </div>
    <div class="modal-toolbar">
      <button class="nav-btn" id="back-btn" title="Voltar">&#x25C0;</button>
      <button class="nav-btn" id="forward-btn" title="Avançar">&#x25B6;</button>
      <button class="nav-btn" id="refresh-btn" title="Recarregar">&#x21BB;</button>
      <button class="nav-btn" id="home-btn" title="Home">&#x2302;</button>
      <input type="text" class="url-bar" id="url-bar" value="${icon.url || icon.name}">
      <button class="nav-btn" id="profile-btn" title="Perfil">&#x1F464;</button>
      <button class="nav-btn" id="menu-btn" title="Menu">&#x2630;</button>
    </div>
    <div class="modal-content" id="modal-content-${icon.id}">
      <iframe
        id="iframe-${icon.id}"
        src=${icon.type === 'folder' ? `/folder/${icon.content}` : icon.url }
        title={icon.name}
      ></iframe>
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

  if (icon.type === 'folder' && icon.content) {
    const modalContent = document.getElementById(`modal-content-${icon.id}`);
    if (modalContent) {
      const root = createRoot(modalContent);
      root.render(<Folder content={icon.content} />);
    }
  }

  const centerModal = (centered: boolean) => {
    const modifier = centered ? 0 : differential
    modal.style.left = `calc(50% - ${modal.offsetWidth / 2}px + ${modifier}px)`;
    modal.style.top = `calc(50% - ${modal.offsetHeight / 2}px + ${modifier}px)`;
    differential = differential > 200 ? -50 : differential + 50
  };

  centerModal(false);
  window.addEventListener('resize', () => centerModal(true))

  highestZIndex++;
  modal.style.zIndex = `${highestZIndex}`;

  const minimizeBtn = modal.querySelector('.minimize-btn') as HTMLElement;
  const maximizeBtn = modal.querySelector('.maximize-btn') as HTMLElement;
  const closeBtn = modal.querySelector('.close-btn') as HTMLElement;
  const header = modal.querySelector('.modal-header') as HTMLElement;
  const iframe = modal.querySelector(`#iframe-${icon.id}`) as HTMLIFrameElement;

  const urlBar = modal.querySelector('#url-bar') as HTMLInputElement;
  let isMaximized = false;

  minimizeBtn?.addEventListener('click', () => {
    modal.style.display = 'none';
    document.getElementById(`taskbar-item-${icon.id}`)?.classList.add("minimized")
  });

  maximizeBtn?.addEventListener('click', () => {
    if (isMaximized) {
      modal.style.width = '600px';
      modal.style.height = '400px';
      centerModal(true);
    } else {
      modal.style.width = '100%';
      modal.style.height = 'calc(100% - 40px)';
      modal.style.top = '0';
      modal.style.left = '0';
    }
    isMaximized = !isMaximized;
  });

  closeBtn?.addEventListener('click', () => {
    modal.remove();
    document.getElementById(`taskbar-item-${icon.id}`)?.remove();
  });

  header?.addEventListener('mousedown', (event) => {
    event.preventDefault();
    const eventTyped = event as MouseEvent
    const startX = eventTyped.clientX;
    const startY = eventTyped.clientY;
    const { left, top } = modal.getBoundingClientRect();
    const shiftX = startX - left;
    const shiftY = startY - top;

    function onMouseMove(event: { clientX: number; clientY: number; }) {
      requestAnimationFrame(() => {
        modal.style.left = `${event.clientX - shiftX}px`;
        modal.style.top = `${event.clientY - shiftY}px`;
      });
    }

    function onMouseUp() {
      modal.classList.remove('dragging')
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    modal.classList.add('dragging')
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  header.ondragstart = () => false;

  const backBtn = modal.querySelector('#back-btn');
  const forwardBtn = modal.querySelector('#forward-btn');
  const refreshBtn = modal.querySelector('#refresh-btn');
  const homeBtn = modal.querySelector('#home-btn');

  backBtn?.addEventListener('click', () => iframe?.contentWindow?.history.back());
  forwardBtn?.addEventListener('click', () => iframe?.contentWindow?.history.forward());
  refreshBtn?.addEventListener('click', () => iframe.src = iframe.src + '#');
  homeBtn?.addEventListener('click', () => iframe.src = icon.url || '');

  urlBar.addEventListener('change', () => {
    iframe.src = urlBar.value;
  });


  modal.addEventListener('mousedown', () => {
    highestZIndex++;
    modal.style.zIndex = `${highestZIndex}`;
  });

  addTaskbarItem(icon);
  const grips = modal.querySelectorAll('.resize-grip') as NodeListOf<HTMLElement>;
  grips.forEach(grip => {
    grip.addEventListener('mousedown', initResize);
  });

  function initResize(event: MouseEvent) {
    modal.classList.add('dragging')
    const grip = event.target as HTMLElement;
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = modal.offsetWidth;
    const startHeight = modal.offsetHeight;
    const startLeft = modal.offsetLeft;
    const startTop = modal.offsetTop;

    function doResize(event: { clientX: number; clientY: number; }) {
      requestAnimationFrame(() => {
        if (grip.classList.contains('resize-grip-right')) {
          modal.style.width = `${startWidth + event.clientX - startX}px`;
        }
        if (grip.classList.contains('resize-grip-bottom')) {
          modal.style.height = `${startHeight + event.clientY - startY}px`;
        }
        if (grip.classList.contains('resize-grip-left')) {
          modal.style.width = `${startWidth - (event.clientX - startX)}px`;
          modal.style.left = `${startLeft + (event.clientX - startX)}px`;
        }
        if (grip.classList.contains('resize-grip-top')) {
          modal.style.height = `${startHeight - (event.clientY - startY)}px`;
          modal.style.top = `${startTop + (event.clientY - startY)}px`;
        }
        if (grip.classList.contains('resize-grip-top-left')) {
          modal.style.width = `${startWidth - (event.clientX - startX)}px`;
          modal.style.left = `${startLeft + (event.clientX - startX)}px`;
          modal.style.height = `${startHeight - (event.clientY - startY)}px`;
          modal.style.top = `${startTop + (event.clientY - startY)}px`;
        }
        if (grip.classList.contains('resize-grip-top-right')) {
          modal.style.width = `${startWidth + event.clientX - startX}px`;
          modal.style.height = `${startHeight - (event.clientY - startY)}px`;
          modal.style.top = `${startTop + (event.clientY - startY)}px`;
        }
        if (grip.classList.contains('resize-grip-bottom-left')) {
          modal.style.width = `${startWidth - (event.clientX - startX)}px`;
          modal.style.left = `${startLeft + (event.clientX - startX)}px`;
          modal.style.height = `${startHeight + event.clientY - startY}px`;
        }
        if (grip.classList.contains('resize-grip-bottom-right')) {
          modal.style.width = `${startWidth + event.clientX - startX}px`;
          modal.style.height = `${startHeight + event.clientY - startY}px`;
        }
      });
    }

    function stopResize() {
      modal.classList.remove('dragging')
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
    }

    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
  }
}

function addTaskbarItem(icon: IconProps) {
  const taskbar = document.getElementById('open-windows');
  const taskbarItem = document.createElement('div');
  taskbarItem.classList.add('taskbar-item');
  taskbarItem.id = `taskbar-item-${icon.id}`;
  taskbarItem.innerHTML = `<span>
    <img src="${icon.img}" alt="${icon.name}">
    ${icon.name}
  </span>`;

  taskbarItem.addEventListener('click', () => {
    const modal = document.getElementById(`modal-${icon.id}`);
    if (modal?.style.visibility === 'hidden') {
      modal.style.visibility = 'visible';
      taskbarItem.classList.remove('minimized');
    } else if (modal) {
      modal.style.visibility = 'hidden';
      taskbarItem.classList.add('minimized');
    }
  });

  taskbar?.appendChild(taskbarItem);
}
