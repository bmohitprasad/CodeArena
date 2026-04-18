import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [darkMode,setDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem("darkMode");
        return saved ? JSON.parse(saved) : false;
    })

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode))
    }, [darkMode])

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context;
}