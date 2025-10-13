import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label"
import useQsStore from "@/store/question"

function Home() {
    const [upload, setUpload] = useState<boolean>(false)
    const [file, setFile] = useState<string>()
    const { getRandomQuestion, setQuestion, question } = useQsStore()
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
    useEffect(() => {
        console.log(question)
    }, [question])
    return (
        <>
            <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-amber-100 opacity-75">
                <div className="absolute -mt-25 h-[150px] w-[400px] rounded-lg bg-green-300">
                    <Input
                        className="absolute z-10 h-full w-full cursor-pointer bg-green-300 text-lg opacity-0"
                        id="md"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xl">
                        点击上传文件
                        {getRandomQuestion()}
                    </div>
                </div>
                <div
                    className="z-50 h-[50px] w-[50px] bg-red-400"
                    onClick={getRandomQuestion}
                >
                    11111
                </div>
            </div>
        </>
    )
}

export default Home
