import { create } from 'zustand'
interface CurrentAccountState {
    currentAccount: number
    setCurrentAccount: (currentAccount: number) => void
}

export const useCurrentAccount = create<CurrentAccountState>((set) => {
    return {
        currentAccount: 0,
        setCurrentAccount: (currentAccount: number) => {
            set({ currentAccount })
        },
    }
})
