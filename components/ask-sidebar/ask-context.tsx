'use client'

import { createContext, useContext, useState } from 'react'

type AskState = 'closed' | 'open' | 'minimized'

interface AskContextValue {
  state: AskState
  isOpen: boolean
  open: () => void
  close: () => void
  minimize: () => void
  toggle: () => void
}

const AskContext = createContext<AskContextValue>({
  state: 'closed',
  isOpen: false,
  open: () => {},
  close: () => {},
  minimize: () => {},
  toggle: () => {},
})

export const useAsk = () => useContext(AskContext)

export function AskProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AskState>('closed')

  return (
    <AskContext.Provider
      value={{
        state,
        isOpen: state === 'open',
        open: () => setState('open'),
        close: () => setState('closed'),
        minimize: () => setState('minimized'),
        toggle: () => setState((s) => (s === 'open' ? 'minimized' : 'open')),
      }}
    >
      {children}
    </AskContext.Provider>
  )
}
