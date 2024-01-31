import {create} from 'zustand'

const useStoreBlogCount = create((set) => ({
    blogCountData: '',
    // setData: () => set((state) => ({data: state.data+1}))
    setBlogCountData: (newCount) => set({ blogCountData: newCount })
  }))

export default useStoreBlogCount