import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function PrimitiveArrayField({ label, arrayData, setArrayData }) {
  const items = Array.isArray(arrayData) ? arrayData : [];

  const updateItem = (index, value) => {
    const newArray = items.map((it, idx) => (idx === index ? value : it));
    setArrayData(newArray);
  };

  const addItem = () => setArrayData([...items, ""]);
  const removeItem = (index) => setArrayData(items.filter((_, i) => i !== index));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <label>{label}</label>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }} >
          <InputText value={it} onChange={(e) => updateItem(i, e.target.value)} className="flex-1" />
          <Button icon="pi pi-trash" className="p-button-danger" onClick={() => removeItem(i)} />
        </div>
      ))}
      <Button label={`Add ${label}`} onClick={addItem} />
    </div>
  );
}
