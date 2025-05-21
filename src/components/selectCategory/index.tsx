'use client'

type SelectCategoryProps = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
} & React.SelectHTMLAttributes<HTMLSelectElement>

export default function SelectCategory({
  label,
  value,
  onChange,
  ...rest
}: SelectCategoryProps) {
  return (
    <div className="flex flex-col gap-2 ml-12.5">
      <label htmlFor="category" className="text-[#AFABB6]">
        {label}
      </label>
      <select
        name="category"
        id="category"
        className="bg-[#111112] border border-[#252529] rounded-lg outline-none p-2.5 cursor-pointer text-[#AFABB6]"
        {...rest}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          Selecione
        </option>
        <option value="genérico">Genérico</option>
        <option value="padaria">Padaria</option>
        <option value="legume">Legume</option>
        <option value="carne">Carne</option>
        <option value="fruta">Fruta</option>
        <option value="bebida">Bebida</option>
      </select>
    </div>
  )
}
