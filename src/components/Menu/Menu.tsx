import { Menu } from "antd";
import "../../screens/Home/Home.css"
import { Link } from "react-router-dom";

const items = [
  {
    key: '1',
    label: <a href="/" title="Voltar ao inicio">Home</a>,
  },
  {
    key: '2',
    label: <a href="https://github.com/giuzambot" target="_blank" rel="noreferrer noopener" title="GitHub">GitHub</a>,
  },
  {
    key: '3',
    label: <a href="https://www.linkedin.com/in/giuzambot/" target="_blank" rel="noreferrer noopener" title="LinkedIn">LinkedIn</a>,
  },
  {
    key: '4',
    label: <a href="https://clubedeautores.com.br/livros/autores/giuzambot" target="_blank" rel="noreferrer noopener" title="Meus Livros">Meus Livros</a>,
  },
  {
    key: '5',
    label: <Link to='/music' >Minhas Músicas</Link>
  }
];

export const MainMenu = () => {
  return (
    <Menu className="menu" theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items} />);
}
