import Navbar from "./Navbar";
import "./header.scss";

const Header = ({ darkMode, toggleDarkMode, themeMode, enableAutoTheme }) => {
  return (
    <header className="header">
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        themeMode={themeMode}
        enableAutoTheme={enableAutoTheme}
      />
    </header>
  );
};

export default Header;