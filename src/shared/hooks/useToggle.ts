import { useCallback, useState } from 'react'
export interface UseToggleTypes {
  value: boolean
  setValue: (arg: boolean) => void
  toggle: (arg: boolean) => void
  setTrue: () => void
  setFalse: () => void
}
export const useToggle = (initial = false): UseToggleTypes => {
  const [value, setValue] = useState(initial)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue(prev => !prev), [])

  return { value, setValue, toggle, setTrue, setFalse }
}
