import { create } from 'zustand'

export const useSeedStore = create((set) => ({
    seeds: '',
    setSeeds: (seed: string) => set({ seed }),
}))
