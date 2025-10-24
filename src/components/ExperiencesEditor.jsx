import { Button } from "primereact/button";
import TextField from "./TextField";
import ArrayField from "./ArrayField";
import PrimitiveArrayField from "./PrimitiveArrayField";

export default function ExperiencesEditor({ data = [], setData }) {
  const items = Array.isArray(data) ? data : [];

  const update = (index, key, value) => {
    const next = items.map((it, i) => (i === index ? { ...it, [key]: value } : it));
    setData(next);
  };

  const add = () => setData([...items, { companyName: "", position: "", location: "", startDate: "", endDate: "", awards: [], media: [] }]);
  const remove = (index) => setData(items.filter((_, i) => i !== index));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <label>Experiences</label>
      {items.map((exp, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>{exp.companyName || `Experience ${i + 1}`}</strong>
            <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => remove(i)} />
          </div>
          <TextField label="Company" value={exp.companyName} onChange={(v) => update(i, "companyName", v)} />
          <TextField label="Position" value={exp.position} onChange={(v) => update(i, "position", v)} />
          <TextField label="Location" value={exp.location} onChange={(v) => update(i, "location", v)} />
          <TextField label="Start Date" value={exp.startDate} onChange={(v) => update(i, "startDate", v)} />
          <TextField label="End Date" value={exp.endDate} onChange={(v) => update(i, "endDate", v)} />
          <PrimitiveArrayField label="Awards" arrayData={exp.awards} setArrayData={(val) => update(i, "awards", val)} />
          <ArrayField label="Media" arrayData={exp.media} setArrayData={(val) => update(i, "media", val)} fields={["type", "url"]} />
        </div>
      ))}
      <Button label="Add Experience" onClick={add} />
    </div>
  );
}
