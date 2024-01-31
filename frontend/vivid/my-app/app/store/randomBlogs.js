import {create} from 'zustand'

const useStoreRandomBlogs = create((set) => ({
    randomBlogs: 'AAA',
    // setData: () => set((state) => ({data: state.data+1}))
    setRandomBlogs: (newData) => set({ randomblogs: newData })
  }))

export default useStoreRandomBlogs