// src/hooks/useChat.ts

import { useState } from "react"
import type { ChatMessage } from "../services/chatService"
import { sendMessageToChatAPI } from "../services/chatService"


export default function useChat() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (userInput: string) => {
    const newUserMessage: ChatMessage = {
      role: "user",
      content: userInput,
    }

    const updatedHistory = [...chatHistory, newUserMessage]
    setChatHistory(updatedHistory)
    setIsTyping(true)
    setError(null)

    try {
      const assistantReply = await sendMessageToChatAPI(userInput, updatedHistory)

      const newAssistantMessage: ChatMessage = {
        role: "assistant",
        content: assistantReply,
      }

      setChatHistory((prev) => [...prev, newAssistantMessage])
    } catch (err: any) {
      setError(err.message || "Something went wrong.")
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Unable to fetch a response.",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return {
    chatHistory,
    isTyping,
    error,
    sendMessage,
  }
}
