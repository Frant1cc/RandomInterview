import { useState } from "react"
import { Input } from "@/components/ui/input.tsx"
import useQsStore from "@/store/question"
import { useTypewriter } from "react-typewriter-plus"

function Home() {
    const [upload, setUpload] = useState<boolean>(false)
    const [nowQuestion, setNowQuestion] = useState<string[]>()
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const text = useTypewriter(nowQuestion && nowQuestion.length > 0 ? nowQuestion[0] : "", {
        speed: 80,
        cursor: false,
        loop: false,
        type: "text"
    })
    const { getRandomQuestion, setQuestion, getLastQuestion } = useQsStore()
    const handleFileChange = async (event: any) => {
        const file = event.target.files[0]
        if (!file) return

        try {
            if (!file.name.endsWith(".md") && file.type !== "text/x-markdown") {
                console.log("请上传 .md 文件")
                return
            }

            const qsString = await readFileAsText(file)
            setQuestion(qsString)
            await setNowQuestion(getRandomQuestion())
            setUpload(true)
        } catch (error) {
            console.error("文件处理错误:", error)
        }
    }

    const readFileAsText = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (e) => resolve(e.target!.result as string)
            reader.onerror = (error) => reject(error)
            reader.readAsText(file, "UTF-8")
        })
    }

    const handleChangeQuestion = async () => {
        await setNowQuestion(getRandomQuestion())
        setShowAnswer(false)
    }
    const handleLastQuestion = async () => {
        await setNowQuestion(getLastQuestion())
        setShowAnswer(false)
    }
    return (
        <>
            {upload ? (
                <>
                    <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center bg-amber-100 opacity-75">
                        <div className="absolute top-30 flex h-[160px] w-[800px] items-center justify-center rounded-lg bg-gray-300/50">
                            <div className="font-nomo text-3xl text-black">{text}</div>
                        </div>
                        <div
                            className="absolute top-45 right-[220px] flex h-[40px] w-[80px] cursor-pointer items-center justify-center rounded-xl border-2 border-black/50 bg-gray-500"
                            onClick={() => setShowAnswer(!showAnswer)}
                        >
                            <div className="text-white">{showAnswer ? "关闭" : "显示"}答案</div>
                        </div>
                        <div className="absolute top-[300px] flex flex-nowrap gap-[120px]">
                            <div
                                className="flex h-[40px] w-[80px] cursor-pointer items-center justify-center rounded-xl border-2 border-black/50 bg-gray-500"
                                onClick={() => handleLastQuestion()}
                            >
                                <div className="text-white">上一题</div>
                            </div>
                            <div
                                className="flex h-[40px] w-[80px] cursor-pointer items-center justify-center rounded-xl border-2 border-black/50 bg-gray-500"
                                onClick={() => handleChangeQuestion()}
                            >
                                <div className="text-white">下一题</div>
                            </div>
                        </div>

                        {showAnswer ? (
                            <div className="absolute top-90 max-h-[400px] w-[1200px] overflow-y-auto rounded-lg bg-gray-300/50 p-[50px]">
                                <div className="font-nomo relative text-xl text-black">
                                    {nowQuestion && nowQuestion.length > 0 ? nowQuestion[1] : "此问题答案为空"}
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </>
            ) : (
                <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-amber-100 opacity-75">
                    <div className="absolute -mt-25 h-[150px] w-[400px] rounded-lg bg-green-300">
                        <Input
                            className="absolute z-10 h-full w-full cursor-pointer bg-green-300 text-lg opacity-0"
                            id="md"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-3xl">
                            点击上传文件
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Home
