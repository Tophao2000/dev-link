import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Carregar preferência do localStorage ao iniciar
  useEffect(() => {
    const darkModePref = localStorage.getItem("@darkMode");
    if (darkModePref === "true") {
      setIsDarkMode(true);
    }
  }, []);

  // Atualizar localStorage sempre que o modo for alterado
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("@darkMode", String(newValue));
      return newValue;
    });
  };

  return (
    <main
      className={`w-full min-h-screen main  ${
        isDarkMode ? " text-white" : "text-black"
      } ${isDarkMode ? "darkMode" : "lightMode"}`}
    >
      <button
        onClick={toggleDarkMode}
        className="absolute md:fixed top-4 right-4 w-16 h-8 flex items-center rounded-full transition-colors duration-300
                     bg-gray-300 dark:bg-gray-700"
      >
        {/* Ícone dentro do thumb */}
        <span
          className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white flex items-center justify-center
                        transition-transform duration-300 transform ${
                          isDarkMode ? "translate-x-8" : "translate-x-0"
                        }`}
        >
          {isDarkMode ? (
            <FaMoon className="w-4 h-4 text-gray-800" />
          ) : (
            <FaSun className="w-4 h-4 text-yellow-500" />
          )}
        </span>
      </button>
      <Outlet />
    </main>
  );
}

export default Layout;
