import { create } from "zustand"

interface QsStore {
    question: [string, string][]
    lastIndex: number
    nowIndex: number
    setQuestion: (qsString: string) => void
    getRandomQuestion: () => [string, string]
    getLastQuestion: () => [string, string]
}

const useQsStore = create<QsStore>((set, get) => ({
    question: [],
    lastIndex: -1,
    nowIndex: -1,
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
        if (get().lastIndex !== get().nowIndex) {
            get().lastIndex = get().nowIndex
        }

        let randomIndex = Math.floor(Math.random() * count)
        while (randomIndex === get().lastIndex) {
            randomIndex = Math.floor(Math.random() * count)
        }
        get().nowIndex = randomIndex
        console.log(questions[randomIndex])
        return questions[randomIndex]
    },
    getLastQuestion: () => {
        const questions = get().question
        const lastIndex = get().lastIndex
        get().nowIndex = lastIndex
        console.log("last", lastIndex)
        console.log("lastquestion:", questions[lastIndex])
        return questions[lastIndex]
    }
}))

export default useQsStore
