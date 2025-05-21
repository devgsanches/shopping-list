'use client'

import appleIcon from '@/assets/icons/tags/appleIcon.svg'
import bakeryIcon from '@/assets/icons/tags/bakeryIcon.svg'
import drinkIcon from '@/assets/icons/tags/drinkIcon.svg'
import meatIcon from '@/assets/icons/tags/meatIcon.svg'
import vegetableIcon from '@/assets/icons/tags/vegetableIcon.svg'
import moreIcon from '@/assets/icons/moreIcon.svg'
import Image from 'next/image'
import { useState } from 'react'
import Tag from '../tag'
import { CircleCheckBig, SquarePen, Trash } from 'lucide-react'
import { useItems } from '@/contexts/items/useItems'
import Input from '../input'

interface Item {
  id: string
  title: string
  quantity: string
  option: string
  category: string
}

type ItemProps = {
  id?: string
  title: string
  quantity: string
  option: string
  category: string
}
export default function Item({
  id,
  title,
  quantity,
  option,
  category,
}: ItemProps) {
  const [checked, setChecked] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [titleValue, setTitleValue] = useState<string>('')
  const [quantityValue, setQuantityValue] = useState<string>('')
  const [validateError, setValidateError] = useState<boolean>(false)
  const { setItems } = useItems()
  function getFormattedQuantity() {
    if (Number(quantity) <= 1 && (option === 'unidade' || option === 'litro')) {
      return `${quantity} ${option}`
    }

    if (Number(quantity) > 1 && (option === 'unidade' || option === 'litro')) {
      return `${quantity} ${option}s`
    }

    return `${quantity} ${option}`
  }

  function handleInfoByCategory() {
    switch (category) {
      case 'genérico':
        return (
          <Tag
            category={category}
            primaryColor="#A3A3A3"
            secondaryColor="#232323"
          />
        )
      case 'padaria':
        return (
          <Tag
            icon={bakeryIcon}
            category={category}
            primaryColor="#BB9F3A"
            secondaryColor="#211E12"
          />
        )
      case 'legume':
        return (
          <Tag
            icon={vegetableIcon}
            category={category}
            primaryColor="#8CAD51"
            secondaryColor="#1C2015"
          />
        )
      case 'carne':
        return (
          <Tag
            icon={meatIcon}
            category={category}
            primaryColor="#DB5BBF"
            secondaryColor="#251622"
          />
        )
      case 'fruta':
        return (
          <Tag
            icon={appleIcon}
            category={category}
            primaryColor="#E07B67"
            secondaryColor="#261A17"
          />
        )
      case 'bebida':
        return (
          <Tag
            icon={drinkIcon}
            category={category}
            primaryColor="#7B94CB"
            secondaryColor="#1A1D23"
          />
        )
      default:
        null
    }
  }
  function deleteItem() {
    const items = JSON.parse(
      localStorage.getItem('shopping-list:items') || '[]'
    )

    const updatedItems = items.filter((item: Item) => item.id.toString() !== id)

    localStorage.setItem('shopping-list:items', JSON.stringify(updatedItems))
    setItems(updatedItems) // atualiza no localStorage e no contexto > cliente
  }

  function editItems() {
    if (titleValue && quantityValue) {
      setActive(false)
      const items = JSON.parse(
        localStorage.getItem('shopping-list:items') || '[]'
      )

      const itemsUpdated = items.map((item: Item) => {
        return item.id === id
          ? {
              ...item,
              title: titleValue,
              quantity: quantityValue,
            }
          : item
      })

      localStorage.setItem('shopping-list:items', JSON.stringify(itemsUpdated))
      setItems(itemsUpdated)
      setEdit(false)
    }

    setValidateError(true)
  }

  return (
    <div
      className={`${
        edit ? 'h-auto' : 'h-[4.25rem]'
      }  bg-[#17171A] border border-[#252529] rounded-lg p-4 flex items-center justify-between ${
        checked ? 'opacity-50' : null
      }`}
    >
      <div
        className={`flex gap-4 items-center ${
          edit ? 'justify-center w-full' : null
        }`}
      >
        {!edit && (
          <>
            <input
              type="checkbox"
              className="w-5 h-5 appearance-none bg-[#17171A] border-2 border-[#A881E6] rounded relative
             checked:bg-[#2F723D] checked:border-none
             checked:after:content-['✔'] checked:after:text-white checked:after:text-sm
             checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center cursor-pointer"
              onChange={() => setChecked(prevState => !prevState)}
            />

            <div>
              <p
                className={`text-sm text-[#FBF9FE] ${
                  checked ? 'line-through decoration-2' : null
                } capitalize`}
              >
                {title}
              </p>
              <span className="text-[#AFABB6]">{getFormattedQuantity()}</span>
            </div>
          </>
        )}
        {edit && (
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col gap-2 items-center">
              <input
                type="text"
                value={titleValue}
                onChange={e => setTitleValue(e.target.value)}
                placeholder="Novo item"
                className="outline-none border border-[#A881E6] px-2 py-1 rounded-lg w-40"
              />
              <input
                type="text"
                value={quantityValue}
                onChange={e => setQuantityValue(e.target.value)}
                placeholder="Nova quantidade"
                className="outline-none border border-[#A881E6] px-2 py-1 rounded-lg w-40"
              />
              {validateError && (
                <p className="normal-case text-xs text-red-400">
                  preencha os campos.
                </p>
              )}
            </div>
            <button onClick={editItems} className="w-full flex justify-center">
              <CircleCheckBig color="#A881E6" />
            </button>
          </div>
        )}
      </div>

      {!active && (
        <div className="flex gap-3">
          {handleInfoByCategory()}
          <Image
            src={moreIcon}
            alt="More Icon"
            width={20}
            height={20}
            onClick={() => setActive(prevState => !prevState)}
          />
        </div>
      )}
      {!edit && active && (
        <div className="flex items-center gap-2 bg-[#a881e655] p-1.5 rounded-lg">
          <Trash color="#A881E6" size={20} onClick={deleteItem} />
          <SquarePen
            size={20}
            color="#A881E6"
            onClick={() => {
              setEdit(prevState => !prevState)
              setValidateError(false)
            }}
          />

          <Image
            src={moreIcon}
            alt="More Icon"
            width={20}
            height={20}
            onClick={() => setActive(prevState => !prevState)}
          />
        </div>
      )}
    </div>
  )
}
