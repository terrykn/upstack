import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import themeCatalog from '../themeCatalog';

export default function LocalThemeSwitcher({ value, onChange, containerId }) {
  const [themeStyles, setThemeStyles] = useState('');

  const themeOptions = themeCatalog.map((t) => ({
    label: t.name,
    value: t.id
  }));

  useEffect(() => {
    if (!value || !containerId) return;

    const loadLocalTheme = async () => {
      const catalogEntry = themeCatalog.find((t) => t.id === value) || {};
      const folder = catalogEntry.light || catalogEntry.id || value;
      
      try {
        // Try to fetch theme CSS content
        const response = await fetch(`/node_modules/primereact/resources/themes/${folder}/theme.css`)
          .catch(() => fetch(`https://unpkg.com/primereact/resources/themes/${folder}/theme.css`));
        
        if (response.ok) {
          let cssText = await response.text();
          
          // Scope all CSS rules to the container
          // This regex adds the container ID to each CSS rule
          cssText = cssText.replace(/([^{]+){/g, (match, selector) => {
            // Skip keyframe rules
            if (selector.includes('@keyframes')) return match;
            
            // Add container scope to each selector
            const selectors = selector.split(',').map(s => {
              s = s.trim();
              // Handle :root and html selectors
              if (s === ':root' || s === 'html') {
                return `#${containerId}`;
              }
              // Handle body selectors
              if (s === 'body') {
                return `#${containerId}`;
              }
              // Add container scope to other selectors
              return `#${containerId} ${s}`;
            }).join(', ');
            
            return `${selectors} {`;
          });
          
          setThemeStyles(cssText);
        }
      } catch (error) {
        console.error('Error loading local theme:', error);
      }
    };

    loadLocalTheme();
  }, [value, containerId]);

  return (
    <div>
      <style>{themeStyles}</style>
      <div className="p-field">
        <label htmlFor="theme-select" className="p-text-bold">Preview Theme</label>
        <Dropdown
          id="theme-select"
          value={value}
          options={themeOptions}
          onChange={(e) => onChange(e.value)}
          placeholder="Select a theme"
          className="w-full"
        />
      </div>
    </div>
  );
}