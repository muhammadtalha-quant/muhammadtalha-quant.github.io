import { useCallback } from 'react'

export const useTabCompletion = (commands: string[]) => {
  const complete = useCallback(
    (input: string): string | null => {
      if (!input.trim()) return null

      const matches = commands.filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      )

      if (matches.length === 1) {
        return matches[0]
      }

      return null
    },
    [commands]
  )

  return { complete }
}
