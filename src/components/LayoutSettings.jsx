import TextField from "./TextField";


export default function LayoutSettings({ layout, setLayout }) {
  return (
    <div>
      <h2>Layout Settings</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        {Object.entries(layout).map(([key, value]) => (
          <TextField
            key={key}
            label={key}
            value={value}
            onChange={(val) => setLayout({ ...layout, [key]: val })}
          />
        ))}
      </div>
    </div>
  );
}