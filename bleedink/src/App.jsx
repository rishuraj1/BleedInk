import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Button, Container, Footer, Header, Loader } from "./components";
import { ThemeProvider } from "./contexts/themeContext.js";

const App = () => {
  const [theme, setTheme] = useState("light");
  const setThemeMode = (mode) => {
    setTheme(mode);
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  return (
    <ThemeProvider value={{ theme, setThemeMode }}>
      <div className="dark:bg-slate-950 flex flex-col h-full justify-between min-h-screen">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
