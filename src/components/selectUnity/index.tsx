'use client'

type SelectUnityProps = {
  label: string
  unityValue: string
  optionValue: string
  onQuantityChange: (value: string) => void
  onOptionChange: (value: string) => void
} & React.SelectHTMLAttributes<HTMLSelectElement> &
  React.InputHTMLAttributes<HTMLInputElement>

export default function SelectUnity({
  label,
  unityValue,
  optionValue,
  onQuantityChange,
  onOptionChange,
  ...rest
}: SelectUnityProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="quantity-input" className="text-[#AFABB6]">
        {label}
      </label>
      <div className="flex items-center">
        <input
          id="quantity-input"
          className={`w-[6rem] bg-[#111112] border border-[#252529] outline-none rounded-lg p-2 absolute`}
          {...rest}
          type="number"
          value={unityValue}
          onChange={e => onQuantityChange(e.target.value)}
        />
        <select
          name="unit"
          id="unit"
          className="relative left-15 p-2.5 border border-[#AFABB6] bg-[#252529] rounded-tr-lg rounded-br-lg outline-none text-[#AFABB6 cursor-pointer"
          value={optionValue}
          onChange={e => onOptionChange(e.target.value)}
        >
          <option value="unidade">Un.</option>
          <option value="litro">L</option>
          <option value="kg">Kg</option>
        </select>
      </div>
    </div>
  )
}
