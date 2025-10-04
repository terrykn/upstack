import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";


export default function TextField({ label, value, onChange, textarea = false }) {
  return (
    <div className="mb-3">
      <label className="block capitalize">{label.replace(/([A-Z])/g, " $1")}</label>
      {textarea ? (
        <InputTextarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className="w-full" />
      ) : (
        <InputText value={value} onChange={(e) => onChange(e.target.value)} className="w-full" />
      )}
    </div>
  );
}