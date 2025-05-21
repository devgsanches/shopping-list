'use client'

import { useItems } from '@/contexts/items/useItems'
import Item from '../Item'

export default function ItemList() {
  const { items } = useItems()

  if (items.length === 0) {
    return (
      <div className="px-6 mt-28 pt-[2.5rem] text-center text-gray-500">
        Nenhum item na lista
      </div>
    )
  }

  return (
    <div className="px-6 mt-28 pt-[2.5rem] flex flex-col gap-2">
      {items.map(item => (
        <Item
          key={item.id}
          title={item.title}
          quantity={item.quantity}
          option={item.option}
          category={item.category}
          id={item.id}
        />
      ))}
    </div>
  )
}
