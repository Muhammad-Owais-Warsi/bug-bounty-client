import { create } from "zustand";
import { persist } from "zustand/middleware";


export const bountiesStore = create(persist(
    (set) => ({
    bounties:[],
    setBounties:(bounty) => set((state) => ({bounties:[...state.bounties,bounty]}))
    }),
    {
        name:"bounties-storage"
    }
    )
)