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
    <div className="mb-3">
      <label className="block">Education</label>
      {items.map((edu, i) => (
        <div key={i} className="mb-4 p-3 border rounded">
          <div className="flex justify-between items-center mb-2">
            <strong>{edu.schoolName || `School ${i + 1}`}</strong>
            <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => remove(i)} />
          </div>
          <TextField label="schoolName" value={edu.schoolName} onChange={(v) => update(i, "schoolName", v)} />
          <TextField label="location" value={edu.location} onChange={(v) => update(i, "location", v)} />
          <TextField label="startDate" value={edu.startDate} onChange={(v) => update(i, "startDate", v)} />
          <TextField label="endDate" value={edu.endDate} onChange={(v) => update(i, "endDate", v)} />
          <PrimitiveArrayField label="majors" arrayData={edu.majors} setArrayData={(val) => update(i, "majors", val)} />
          <PrimitiveArrayField label="minors" arrayData={edu.minors} setArrayData={(val) => update(i, "minors", val)} />
          <TextField label="gpa" value={edu.gpa} onChange={(v) => update(i, "gpa", v)} />
          <TextField label="rank" value={edu.rank} onChange={(v) => update(i, "rank", v)} />
          <PrimitiveArrayField label="relevantCourses" arrayData={edu.relevantCourses} setArrayData={(val) => update(i, "relevantCourses", val)} />
          <PrimitiveArrayField label="awards" arrayData={edu.awards} setArrayData={(val) => update(i, "awards", val)} />
          <TextField label="info" value={edu.info} onChange={(v) => update(i, "info", v)} textarea />
          <ArrayField label="media" arrayData={edu.media} setArrayData={(val) => update(i, "media", val)} fields={["type", "url"]} />
        </div>
      ))}
      <Button label="Add Education" onClick={add} />
    </div>
  );
}
