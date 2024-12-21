import { create } from "zustand";
import { persist } from "zustand/middleware";


export const bountiesStore = create(persist(
    (set) => ({
    bounties:[],
    setBounties:(bounty) => set((state) => ({bounties:[...state.bounties,bounty]})),
    updateBounties:(id) => set((state) => ({bounties:state.bounties.filter(bounty => bounty.id !== id)}))
    }),
    {
        name:"bounties-storage"
    }
    )
)