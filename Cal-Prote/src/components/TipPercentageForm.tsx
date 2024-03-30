const tipOptions = [
  {
    id: "tip-10",
    value: 0.1,
    label: "10%",
  },
  {
    id: "tip-20",
    value: 0.2,
    label: "20%",
  },
  {
    id: "tip-150",
    value: 0.5,
    label: "50%",
  },
];

type TipPercentageFormProps = {
    setTip: React.Dispatch<React.SetStateAction<number>>,
    tip: number
}

function TipPercentageForm({ setTip, tip}: TipPercentageFormProps) {
  return (
    <div>
      <h3 className=" font-black text-2xl">Propina:</h3>

      <form action="">
        {tipOptions.map((tipOption) => (
          <div key={tipOption.id} className=" flex gap-2 mt-2">
            <label htmlFor={tipOption.id}>{tipOption.label}</label>
            <input id={tipOption.id} name="tip" value={tipOption.value}
            checked={tipOption.value === tip}
            onChange={e => setTip(+e.target.value)} type="radio"/>

          </div>
        ))}
      </form>
    </div>
  );
}

export default TipPercentageForm;
