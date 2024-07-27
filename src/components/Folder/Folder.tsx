import { iconsMap } from "../../screens/Home/Icons";
import DesktopIcon from "../DesktopIcons/DesktopIcons";


interface FolderProps {
  content: string;
}

const Folder = ({ content }: FolderProps) => {
  const icons = iconsMap[content]

  if (!icons) {
    return <h1>not found</h1>
  }

  return (
    <div className="folder">
      {icons.map(icon => (
        <DesktopIcon key={icon.id} {...icon} />
      ))}
    </div>
  );
};

export default Folder;
