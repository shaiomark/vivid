import {create} from 'zustand'

const useStore = create((set) => ({
    data: '',
    // setData: () => set((state) => ({data: state.data+1}))
    setData: (newData) => set({ data: newData })
  }))

export default useStore