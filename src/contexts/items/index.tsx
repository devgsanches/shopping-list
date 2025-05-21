'use client'

import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from 'react'

export type Item = {
  id: string
  title: string
  quantity: string
  option: string
  category: string
}

type ItemsContextType = {
  items: Item[]
  setItems: Dispatch<SetStateAction<Item[]>>
}

export const ItemsContext = createContext<ItemsContextType | null>(null)

const LOCAL_STORAGE_KEY = 'shopping-list:items'

export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([])

  // Efeito para carregar o estado do localStorage APÓS a montagem inicial (apenas no cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (storedItems) {
          setItems(JSON.parse(storedItems))
          console.log(
            'Items carregados do localStorage:',
            JSON.parse(storedItems)
          )
        }
      } catch (error) {
        console.error('Erro ao carregar items do localStorage:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
        console.log('Estado items salvo no localStorage:', items)
      } catch (error) {
        console.error('Erro ao salvar items no localStorage:', error)
      }
    }
  }, [items])

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  )
}
