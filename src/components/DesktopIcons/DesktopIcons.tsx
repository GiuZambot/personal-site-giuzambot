// Atualização em DesktopIcons.tsx
import React, { useRef } from "react";
import { openModal } from "../Modal/Modal";

export interface IconProps {
  id: string;
  name: string;
  img: string;
  top: number;
  left: number;
  url?: string;
  type?: "folder" | "route" | "external";
  content?: string;
  isInModal?: boolean;
}

const DesktopIcon = (icon: IconProps) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (icon.isInModal) return; // ← desativa arrastar se estiver em modal

    event.preventDefault();
    const parent = iconRef.current?.parentElement;
    const shiftX =
      event.clientX - iconRef.current!.getBoundingClientRect().left;
    const shiftY = event.clientY - iconRef.current!.getBoundingClientRect().top;

    const moveAt = (pageX: number, pageY: number) => {
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      let newLeft = pageX - shiftX - parentRect.left;
      let newTop = pageY - shiftY - parentRect.top;

      const rightLimit = parent.clientWidth - iconRef.current!.offsetWidth;
      const bottomLimit = parent.clientHeight - iconRef.current!.offsetHeight;

      if (newLeft < 0) newLeft = 0;
      if (newTop < 10) newTop = 10;
      if (newLeft > rightLimit) newLeft = rightLimit;
      if (newTop > bottomLimit) newTop = bottomLimit;

      iconRef.current!.style.left = newLeft + "px";
      iconRef.current!.style.top = newTop + "px";
    };

    const onMouseMove = (event: MouseEvent) => moveAt(event.pageX, event.pageY);
    document.addEventListener("mousemove", onMouseMove);

    iconRef.current!.addEventListener(
      "mouseup",
      () => document.removeEventListener("mousemove", onMouseMove),
      { once: true }
    );
  };

  const handleDoubleClick = () => {
    if (icon.type === "external" && icon.url) {
      window.open(icon.url, "_blank");
    } else {
      openModal(icon);
    }
  };

  return (
    <div
      ref={iconRef}
      className="icon"
      id={icon.id}
      title={icon.name}
      style={
        icon.isInModal
          ? {}
          : {
              top: `${icon.top}px`,
              left: `${icon.left}px`,
              position: "absolute",
            }
      }
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <img src={icon.img} alt={icon.name} />
      <div>{icon.name}</div>
    </div>
  );
};

export default DesktopIcon;
