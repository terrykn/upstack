import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import './assets/themes/light-theme.css';
import './layout.css';

export default function Layout() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const themeLink = document.getElementById('theme-link') || document.createElement('link')
        themeLink.id = 'theme-link'
        themeLink.rel = 'stylesheet'
        themeLink.href = theme === 'light' ? '/src/assets/themes/light-theme.css' : '/src/assets/themes/dark-theme.css'
        document.head.appendChild(themeLink)
    }, [theme])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar theme={theme} setTheme={setTheme} />
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    )
}