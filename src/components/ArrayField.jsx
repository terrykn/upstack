import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


export default function ArrayField({ label, arrayData, setArrayData, fields }) {
  const items = Array.isArray(arrayData) ? arrayData : [];

  const updateItem = (index, key, value) => {
    const newArray = items.map((it, idx) => (idx === index ? { ...it, [key]: value } : it));
    setArrayData(newArray);
  };

  const addItem = () => {
    const newItem = Object.fromEntries(fields.map((f) => [f, ""]));
    setArrayData([...items, newItem]);
  };

  return (
    <div>
      <label>{label}</label>
      {items.length > 0 ? (
        items.map((item, i) => (
          <div key={i}>
            {fields.map((f, idx) => (
              <InputText
                key={idx}
                placeholder={f}
                value={item[f] ?? ""}
                onChange={(e) => updateItem(i, f, e.target.value)}
                className="flex-1"
              />
            ))}
          </div>
        ))
      ) : (
        <div>No {label.toLowerCase()} yet.</div>
      )}
      <Button label={`Add ${label}`} onClick={addItem} />
    </div>
  );
}