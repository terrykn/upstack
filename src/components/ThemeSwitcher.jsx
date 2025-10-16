import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { ListBox } from 'primereact/listbox';
import themeCatalog from '../themeCatalog';

export default function ThemeSwitcher() {
  const [visible, setVisible] = useState(false);
  const defaultTheme = themeCatalog && themeCatalog.length > 0 ? themeCatalog[0].id : 'vela-blue';
  const [current, setCurrent] = useState(() => {
    const stored = localStorage.getItem('prime-theme');
    return stored && themeCatalog.find((t) => t.id === stored) ? stored : defaultTheme;
  });

  useEffect(() => {
    loadTheme(current);
  }, [current]);

  useEffect(() => {
    const root = document.documentElement;
    const obs = new MutationObserver(() => {
      loadTheme(current);
    });

    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, [current]);

  const loadTheme = (name) => {
    const id = 'primereact-theme';
    let link = document.getElementById(id);
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.id = id;
      document.head.appendChild(link);
    }

    const catalogEntry = themeCatalog.find((t) => t.id === name) || {};
    const isDark = document.documentElement.classList.contains('app-dark');
    const folder = isDark && catalogEntry.dark ? catalogEntry.dark : (catalogEntry.light || catalogEntry.id || name);

    const localUrl = `/node_modules/primereact/resources/themes/${folder}/theme.css`;
    const cdnUrl = `https://unpkg.com/primereact/resources/themes/${folder}/theme.css`;

    link.onerror = () => {
      if (link.href !== cdnUrl) link.href = cdnUrl;
    };

    link.href = localUrl;
    localStorage.setItem('prime-theme', name);
  };

  const handleThemeChange = (e) => {
    setCurrent(e.value);
    setVisible(false); // Close sidebar after selection
  };

  const themeOptions = themeCatalog.map((t) => ({
    label: t.name,
    value: t.id
  }));

  return (
    <div>
      <Button 
        icon="pi pi-palette" 
        className="p-button-text" 
        onClick={() => setVisible(true)} 
        aria-label="Open Theme Selector"
      />
      
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        header="Select Theme"
        style={{ width: '300px' }}
      >
        <div className="flex flex-column gap-3">
          <p className="m-0 text-sm text-color-secondary">
            Choose a theme for your interface
          </p>
          <ListBox
            value={current}
            onChange={handleThemeChange}
            options={themeOptions}
            className="w-full"
            listStyle={{ maxHeight: '400px' }}
          />
        </div>
      </Sidebar>
    </div>
  );
}