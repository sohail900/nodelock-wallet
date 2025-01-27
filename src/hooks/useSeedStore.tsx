import { create } from 'zustand'

export const useSeedStore = create((set) => ({
    seed: '',
    setSeeds: (seed: string) => set({ seed }),
}))
