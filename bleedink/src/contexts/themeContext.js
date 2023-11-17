import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setThemeMode: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => useContext(ThemeContext);
