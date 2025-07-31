// src/services/chatService.ts

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export async function sendMessageToChatAPI(message: string, history: ChatMessage[] = []): Promise<string> {
  try {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        history, // optional chat history
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData?.error || "Failed to get response")
    }

    const result = await response.json()
    return result.response || "Sorry, I didn't understand that."
  } catch (error: any) {
    console.error("Chat error:", error)
    throw new Error(error.message || "Unexpected error occurred")
  }
}
