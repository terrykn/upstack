import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import './layout.css';

export default function Layout() {
    const [theme, setTheme] = useState(() => localStorage.getItem('site-theme') || 'light');

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('app-dark'); else root.classList.remove('app-dark');
        localStorage.setItem('site-theme', theme);
    }, [theme]);

    return (
        <div>
            <Navbar theme={theme} setTheme={setTheme} />
            <main>
                <Outlet />
            </main>
        </div>
    )
}