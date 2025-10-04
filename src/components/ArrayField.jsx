import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


export default function ArrayField({ label, arrayData, setArrayData, fields }) {
  const updateItem = (index, key, value) => {
    const newArray = [...arrayData];
    newArray[index][key] = value;
    setArrayData(newArray);
  };

  const addItem = () => {
    const newItem = Object.fromEntries(fields.map(f => [f, ""]));
    setArrayData([...arrayData, newItem]);
  };

  return (
    <div className="mb-3">
      <label className="block">{label}</label>
      {arrayData.map((item, i) => (
        <div key={i} className="flex gap-2 mb-2">
          {fields.map((f, idx) => (
            <InputText
              key={idx}
              placeholder={f}
              value={item[f]}
              onChange={(e) => updateItem(i, f, e.target.value)}
              className={`w-${Math.floor(12 / fields.length)}/12`}
            />
          ))}
        </div>
      ))}
      <Button label={`Add ${label}`} onClick={addItem} />
    </div>
  );
}