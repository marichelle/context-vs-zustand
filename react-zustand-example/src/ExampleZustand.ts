import { create } from 'zustand'

interface ZustandStoreProps {
  containerData: boolean
  innerOneData: boolean
  innerTwoData: boolean
  setContainerData: (value: boolean) => void
  setInnerOneData: (value: boolean) => void
  setInnerTwoData: (value: boolean) => void
}

const useZustandStore = create<ZustandStoreProps, any>(set => ({
  containerData: false,
  innerOneData: false,
  innerTwoData: false,
  setContainerData: args => set({ containerData: args }),
  setInnerOneData: args => set({ innerOneData: args }),
  setInnerTwoData: args => set({ innerTwoData: args }),
}))

export default useZustandStore
