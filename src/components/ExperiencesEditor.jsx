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
    <div className="mb-3">
      <label className="block">Experiences</label>
      {items.map((exp, i) => (
        <div key={i} className="mb-4 p-3 border rounded">
          <div className="flex justify-between items-center mb-2">
            <strong>{exp.companyName || `Experience ${i + 1}`}</strong>
            <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => remove(i)} />
          </div>
          <TextField label="companyName" value={exp.companyName} onChange={(v) => update(i, "companyName", v)} />
          <TextField label="position" value={exp.position} onChange={(v) => update(i, "position", v)} />
          <TextField label="location" value={exp.location} onChange={(v) => update(i, "location", v)} />
          <TextField label="startDate" value={exp.startDate} onChange={(v) => update(i, "startDate", v)} />
          <TextField label="endDate" value={exp.endDate} onChange={(v) => update(i, "endDate", v)} />
          <PrimitiveArrayField label="awards" arrayData={exp.awards} setArrayData={(val) => update(i, "awards", val)} />
          <ArrayField label="media" arrayData={exp.media} setArrayData={(val) => update(i, "media", val)} fields={["type", "url"]} />
        </div>
      ))}
      <Button label="Add Experience" onClick={add} />
    </div>
  );
}
