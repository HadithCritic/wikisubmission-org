'use client'

import { createContext, useContext, useState } from 'react'

type AskState = 'closed' | 'open' | 'minimized'

interface AskContextValue {
  state: AskState
  open: () => void
  close: () => void
  minimize: () => void
  toggle: () => void
}

const AskContext = createContext<AskContextValue>({
  state: 'closed',
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
        open: () => setState('open'),
        close: () => setState('closed'),
        minimize: () => setState('minimized'),
        // navbar toggle: closed→open, open→minimized, minimized→open
        toggle: () => setState((s) => (s === 'open' ? 'minimized' : 'open')),
      }}
    >
      {children}
    </AskContext.Provider>
  )
}
