import { create } from "zustand"
// 定义一个接口，用于描述状态管理器的状态和操作
interface QsStore {
    question: number
}
// 创建一个状态管理器，使用 create 函数，传入一个函数，返回一个对象
/**
 *
 * @param set 用于更新状态
 * @param get 用于获取状态
 * @returns 返回一个对象，对象中的方法可以用于更新状态
 */
const useQsStore = create<QsStore>((set, get) => ({
    question: 1002 // 初始状态
    // incrementPrice: () => set((state) => ({ price: state.price + 1 })), // 更新状态
    // decrementPrice: () => set((state) => ({ price: state.price - 1 })), // 更新状态
    // resetPrice: () => set({ price: 0 }), // 重置状态
    // getPrice: () => get().price, // 获取状态
}))

export default useQsStore
