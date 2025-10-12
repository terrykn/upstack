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
    <div className="mb-3">
      <label className="block">{label}</label>
      {items.map((it, i) => (
        <div key={i} className="flex gap-2 mb-2 items-center">
          <InputText value={it} onChange={(e) => updateItem(i, e.target.value)} className="flex-1" />
          <Button icon="pi pi-trash" className="p-button-danger" onClick={() => removeItem(i)} />
        </div>
      ))}
      <Button label={`Add ${label}`} onClick={addItem} />
    </div>
  );
}
