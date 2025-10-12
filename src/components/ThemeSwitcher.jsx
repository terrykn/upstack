import { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import themeCatalog from '../themeCatalog';

export default function ThemeSwitcher() {
  const menu = useRef(null);
  const defaultTheme = themeCatalog && themeCatalog.length > 0 ? themeCatalog[0].id : 'vela-blue';
  const [current, setCurrent] = useState(() => {
    const stored = localStorage.getItem('prime-theme');
    return stored && themeCatalog.find((t) => t.id === stored) ? stored : defaultTheme;
  });

  useEffect(() => {
    loadTheme(current);
  }, [current]);

  // Watch for root class changes to detect dark-mode toggles and reload theme variant when needed
  useEffect(() => {
    const root = document.documentElement;
    const obs = new MutationObserver(() => {
      // reload current theme so the appropriate dark/light folder is used
      loadTheme(current);
    });

    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, [current]);

  const loadTheme = (name) => {
    // Create or update a dedicated link tag for primereact themes
    const id = 'primereact-theme';
    let link = document.getElementById(id);
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.id = id;
      document.head.appendChild(link);
    }
    // Try local node_modules path first (dev convenience).
    // If the file isn't served, fall back to the Unpkg CDN.
  // determine if there's a dark/light variant for the catalog entry
  const catalogEntry = themeCatalog.find((t) => t.id === name) || {};
  const isDark = document.documentElement.classList.contains('app-dark');
  const folder = isDark && catalogEntry.dark ? catalogEntry.dark : (catalogEntry.light || catalogEntry.id || name);

  const localUrl = `/node_modules/primereact/resources/themes/${folder}/theme.css`;
  const cdnUrl = `https://unpkg.com/primereact/resources/themes/${folder}/theme.css`;

    link.onerror = () => {
      // fallback to CDN on error
      if (link.href !== cdnUrl) link.href = cdnUrl;
    };

    link.href = localUrl;
    // persist selection immediately
    localStorage.setItem('prime-theme', name);
  };

  const items = themeCatalog.map((t) => ({ label: t.name, command: () => setCurrent(t.id) }));

  return (
    <div>
      <Menu model={items} popup ref={menu} id="theme-menu" />
      <Button icon="pi pi-palette" className="p-button-text" onClick={(e) => menu.current?.toggle(e)} aria-controls="theme-menu" aria-haspopup />
    </div>
  );
}
