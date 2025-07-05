import { useCallback, useState } from 'react'

export const useToggle = (initial = false) => {
  const [value, setValue] = useState(initial)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue(prev => !prev), [])

  return { value, toggle, setTrue, setFalse }
}
