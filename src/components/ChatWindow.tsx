// src/components/ChatWindow.tsx

import { useState } from "react"
import useChat from "../hooks/useChat"

interface ChatWindowProps {
  context: any  // You can replace `any` with a stricter type if desired
}

export default function ChatWindow({ context }: ChatWindowProps) {
  const { chatHistory, isTyping, sendMessage } = useChat()

  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input)
      setInput("")
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-[500px] flex flex-col justify-between">
      <div className="overflow-y-auto mb-4 space-y-2 h-full">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`text-sm p-2 rounded ${msg.role === "user" ? "bg-blue-100 text-right ml-auto" : "bg-gray-200 text-left mr-auto"}`}>
            {msg.content}
          </div>
        ))}

        {isTyping && <p className="text-gray-500 italic text-sm">Assistant is typing...</p>}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Ask something about your resume..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}
