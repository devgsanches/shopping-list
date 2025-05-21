'use client'

import CoverBg from '@/assets/cover.svg'
import { useItems } from '@/contexts/items/useItems'

export default function Header() {
  const { items, setItems } = useItems()

  return (
    <header
      className="bg-cover bg-no-repeat h-[11.375rem]"
      style={{
        backgroundImage: `url(${CoverBg.src})`,
      }}
    >
      <h1 className="pt-[5.5rem] pl-[1.5rem] text-2xl font-bold">
        Lista de Compras
      </h1>
    </header>
  )
}
