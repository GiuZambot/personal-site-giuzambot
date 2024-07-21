import Capib from "../../assets/capib.png";
import React, { useRef } from "react";
import { openModal } from "./Modal";

export interface IconProps {
  id: string;
  name: string;
  img: string;
  top: number;
  left: number;
  url: string;
}

const DesktopIcon = (icon: IconProps ) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    const shiftX = event.clientX - iconRef.current!.getBoundingClientRect().left;
    const shiftY = event.clientY - iconRef.current!.getBoundingClientRect().top;

    const moveAt = (pageX: number, pageY: number) => {
      iconRef.current!.style.left = pageX - shiftX + "px";
      iconRef.current!.style.top = pageY - shiftY + "px";
    };

    const onMouseMove = (event: MouseEvent) => {
      moveAt(event.pageX, event.pageY);
    };

    document.addEventListener("mousemove", onMouseMove);

    iconRef.current!.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  };

  const handleDoubleClick = () => {
    openModal(icon)
  }


  return (
    <div
      ref={iconRef}
      className="icon"
      id={icon.id}
      style={{ top: `${icon.top}px`, left: `${icon.left}px` }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <img src={Capib} alt={icon.name} />
      <div>{icon.name}</div>
    </div>
  );
};

export default DesktopIcon;
