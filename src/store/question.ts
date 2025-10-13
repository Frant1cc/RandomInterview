import { create } from "zustand"

interface QsStore {
    question: [string, string][]
    setQuestion: (qsString: string) => void
    getRandomQuestion: () => [string, string]
}

const useQsStore = create<QsStore>((set, get) => ({
    question: [],

    setQuestion: (qsString: string) => {
        if (!qsString?.trim()) {
            console.warn("setQuestion: 输入必须是非空字符串")
            set({ question: [] })
            return
        }

        const regex = /# (.*?)(?:\n|$)|## (.*?)(?:\n|$)/g
        const result: [string, string][] = []
        let currentH1: string | null = null
        let currentAnswer: string = ""
        let match

        while ((match = regex.exec(qsString)) !== null) {
            if (match[1]) {
                if (currentH1 && currentAnswer !== null) {
                    result.push([currentH1, currentAnswer])
                }
                currentH1 = match[1].trim()
                currentAnswer = ""
            } else if (match[2] && currentH1) {
                currentAnswer = match[2].trim()
            }
        }

        if (currentH1 && currentAnswer !== null) {
            result.push([currentH1, currentAnswer])
        }

        console.log("qsString解析结果:", result)

        set({
            question: result
        })
    },
    getRandomQuestion: () => {
        const questions = get().question
        const count = questions.length
        const randomIndex = Math.floor(Math.random() * count)
        console.log(questions[randomIndex])
        return questions[randomIndex]
    }
}))

export default useQsStore
