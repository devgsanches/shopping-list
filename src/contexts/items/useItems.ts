'use client'

import { useContext } from 'react'
import { ItemsContext } from '.'

export const useItems = () => {
  const context = useContext(ItemsContext)
  if (!context) {
    throw new Error('useItems deve ser usado dentro de um <ItemsProvider>')
  }
  return context
}
