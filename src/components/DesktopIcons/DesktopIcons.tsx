import type { MouseEvent } from "react";
import { openModal } from "../Modal/Modal";

export interface IconProps {
  id: string;
  name: string;
  img: string;
  top?: number;
  left?: number;
  url?: string;
  type?: "folder" | "route" | "external";
  content?: string;
  isInModal?: boolean;
}

const DesktopIcon = (icon: IconProps) => {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (icon.type !== "external") {
      event.preventDefault();
      openModal(icon);
    }
  };

  const style = icon.isInModal
    ? undefined
    : {
        top: icon.top === undefined ? undefined : `${icon.top}px`,
        left: icon.left === undefined ? undefined : `${icon.left}px`,
        position: "absolute" as const,
      };

  const content = (
    <>
      <img src={icon.img} alt="" width="128" height="128" />
      <span>{icon.name}</span>
    </>
  );

  if (icon.type === "external" && icon.url) {
    return (
      <a
        className="icon"
        id={icon.id}
        title={icon.name}
        aria-label={icon.name}
        href={icon.url}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
      >
        {content}
      </a>
    );
  }

  if (icon.url) {
    return (
      <a
        className="icon"
        id={icon.id}
        title={icon.name}
        aria-label={icon.name}
        href={icon.url}
        style={style}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className="icon"
      id={icon.id}
      title={icon.name}
      aria-label={icon.name}
      type="button"
      style={style}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default DesktopIcon;
