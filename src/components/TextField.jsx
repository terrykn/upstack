import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";


export default function TextField({ label, value, onChange, textarea = false, helperText }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <label>{label.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}</label>
      {textarea ? (
        <InputTextarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className="w-full" />
      ) : (
        <InputText value={value} onChange={(e) => onChange(e.target.value)} className="w-full" />
      )}
      {helperText && <div className="text-sm text-gray-500 mt-1">{helperText}</div>}
    </div>
  );
}