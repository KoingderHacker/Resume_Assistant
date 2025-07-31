// src/pages/Home.tsx

import { useNavigate } from "react-router-dom"
import SplineViewer from "../components/SplineViewer"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-100 p-6 text-center">
      <div className="max-w-3xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          💼 AI Resume Assistant
        </h1>
        <p className="text-lg text-gray-600">
          Upload your resume, get intelligent suggestions, and chat with an AI
          assistant that helps you land your dream job.
        </p>

        <button
          onClick={() => navigate("/assistant")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </button>

        <div className="mt-10">
          <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.38/build/spline-viewer.js"></script>
          <SplineViewer url="https://prod.spline.design/5QbpxMo0BtaX1Q7Y/scene.splinecode"></SplineViewer>
        </div>
      </div>
    </div>
  )
}
