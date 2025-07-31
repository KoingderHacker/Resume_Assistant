// src/pages/ResumeAssistant.tsx

import { useState } from "react"
import FileUpload from "../components/FileUpload"
import ResumePreview from "../components/ResumePreview"
import ChatWindow from "../components/ChatWindow"
import SplineViewer from "../components/SplineViewer"

export default function ResumeAssistant() {
  const [parsedData, setParsedData] = useState<any | null>(null)

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🧠 AI Resume Assistant
      </h1>

      {!parsedData ? (
        <>
          <FileUpload onUpload={setParsedData} />
          <div className="mt-10">
            <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.38/build/spline-viewer.js"></script>
            <SplineViewer url="https://prod.spline.design/5QbpxMo0BtaX1Q7Y/scene.splinecode"></SplineViewer>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumePreview data={parsedData} />
          <ChatWindow context={parsedData} />
        </div>
      )}
    </div>
  )
}
