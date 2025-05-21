'use client'

type InputProps = {
  label?: string
  width?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({
  label,
  width,
  value,
  onChange,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className="text-[#AFABB6]">
        {label}
      </label>
      <input
        className={`w-[${width}] bg-[#111112] border border-[#252529] outline-none rounded-lg p-2`}
        {...rest}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
