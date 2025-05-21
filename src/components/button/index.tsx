'use client'

import plusIcon from '@/assets/plus.svg'
import Image from 'next/image'

type ButtonProps = {
  onClick: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ onClick, ...rest }: ButtonProps) {
  return (
    <button
      className="flex flex-col gap-2 bg-[#7450AC] items-center justify-center rounded-full w-[2.5rem] h-[2.5rem] hover:bg-[#523480] cursor-pointer"
      {...rest}
      onClick={onClick}
    >
      <Image src={plusIcon} alt="Ícone de mais" />
    </button>
  )
}
