import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme || 'light';
    });

    const [accentColor, setAccentColor] = useState(() => {
        const storedAccent = localStorage.getItem('accentColor');
        return storedAccent || 'blue';
    });

    const [font, setFont] = useState(() => {
        const storedFont = localStorage.getItem('font');
        return storedFont || 'inter';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('accentColor', accentColor);
        document.documentElement.setAttribute('data-accent', accentColor);
    }, [accentColor]);

    useEffect(() => {
        localStorage.setItem('font', font);
        document.documentElement.setAttribute('data-font', font);
    }, [font]);

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    }

    const changeAccentColor = (accentId) => {
        setAccentColor(accentId);
    }

    const changeFont = (fontId) => {
        setFont(fontId);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, accentColor, changeAccentColor, font, changeFont }}>
            {children}
        </ThemeContext.Provider>
    )
}