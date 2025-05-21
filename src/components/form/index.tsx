'use client'

import { useState } from 'react'
import Button from '../button'
import Input from '../input'
import SelectCategory from '../selectCategory'
import SelectUnity from '../selectUnity'
import { useItems } from '@/contexts/items/useItems'
import type { Item } from '@/contexts/items'
import { v4 as uuidv4 } from 'uuid'

export default function Form() {
  const { setItems } = useItems()
  const [title, setTitle] = useState('')
  const [quantity, setQuantity] = useState('')
  const [option, setOption] = useState('unidade')
  const [category, setCategory] = useState('')

  function handleAddItem() {
    if (title.trim() && quantity.trim() && category.trim()) {
      const newItem: Item = {
        id: uuidv4(),
        title: title.trim(),
        quantity: quantity.trim(),
        option,
        category,
        checked: false,
      }
      setItems(prevItems => [...prevItems, newItem])

      setTitle('')
      setQuantity('')
      setOption('unidade')
      setCategory('')
    }
  }

  return (
    <form className="absolute top-[8.5rem] px-6 w-full flex flex-col gap-3">
      <Input
        type="text"
        label="Item"
        placeholder="O que precisa hoje?"
        width="23.75rem"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="flex gap-3 justify-between items-end">
        <SelectUnity
          label="Quantidade"
          placeholder="0"
          unityValue={quantity}
          onQuantityChange={setQuantity}
          optionValue={option}
          onOptionChange={setOption}
        />
        <SelectCategory
          label="Categoria"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <Button onClick={handleAddItem} />
      </div>
    </form>
  )
}
