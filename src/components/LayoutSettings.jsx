import TextField from "./TextField";


export default function LayoutSettings({ layout, setLayout }) {
  return (
    <div className="mb-3">
      <h2 className="font-semibold mb-2">Layout Settings</h2>
      {Object.entries(layout).map(([key, value]) => (
        <TextField
          key={key}
          label={key}
          value={value}
          onChange={(val) => setLayout({ ...layout, [key]: val })}
        />
      ))}
    </div>
  );
}