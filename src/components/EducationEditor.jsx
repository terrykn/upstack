import { Button } from "primereact/button";
import TextField from "./TextField";
import PrimitiveArrayField from "./PrimitiveArrayField";
import ArrayField from "./ArrayField";

export default function EducationEditor({ data = [], setData }) {
  const items = Array.isArray(data) ? data : [];

  const update = (index, key, value) => {
    const next = items.map((it, i) => (i === index ? { ...it, [key]: value } : it));
    setData(next);
  };

  const add = () => setData([...items, { schoolName: "", location: "", startDate: "", endDate: "", majors: [], minors: [], gpa: "", rank: "", relevantCourses: [], awards: [], info: "", media: [] }]);
  const remove = (index) => setData(items.filter((_, i) => i !== index));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <label className="block">Education</label>
      {items.map((edu, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>{edu.schoolName || `School ${i + 1}`}</strong>
            <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => remove(i)} />
          </div>
          <TextField label="School" value={edu.schoolName} onChange={(v) => update(i, "schoolName", v)} />
          <TextField label="Location" value={edu.location} onChange={(v) => update(i, "location", v)} />
          <TextField label="Start Date" value={edu.startDate} onChange={(v) => update(i, "startDate", v)} />
          <TextField label="End Date" value={edu.endDate} onChange={(v) => update(i, "endDate", v)} />
          <PrimitiveArrayField label="Major(s)" arrayData={edu.majors} setArrayData={(val) => update(i, "majors", val)} />
          <PrimitiveArrayField label="Minor(s)" arrayData={edu.minors} setArrayData={(val) => update(i, "minors", val)} />
          <TextField label="GPA" value={edu.gpa} onChange={(v) => update(i, "gpa", v)} />
          <PrimitiveArrayField label="Relevant Courses" arrayData={edu.relevantCourses} setArrayData={(val) => update(i, "relevantCourses", val)} />
          <PrimitiveArrayField label="Awards" arrayData={edu.awards} setArrayData={(val) => update(i, "awards", val)} />
          <TextField label="Additional Info" value={edu.info} onChange={(v) => update(i, "info", v)} textarea />
          <ArrayField label="Media" arrayData={edu.media} setArrayData={(val) => update(i, "media", val)} fields={["type", "url"]} />
        </div>
      ))}
      <Button label="Add Education" onClick={add} />
    </div>
  );
}
