import { useState, useCallback } from 'react'

/**
 * Custom hook for simple toggle state management
 * Useful for modals, dropdowns, and other boolean states
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(v => !v)
  }, [])

  const setValueDirectly = useCallback((newValue: boolean) => {
    setValue(newValue)
  }, [])

  return [value, toggle, setValueDirectly]
}
