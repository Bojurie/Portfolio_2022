import Navbar from "./Navbar";
import "./header.scss";

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </header>
  );
};

export default Header;
