// src/components/FileUpload.tsx

import { useState } from "react"
import { uploadResume } from "../services/resumeService"

export default function FileUpload({ onUpload }: { onUpload: (data: any) => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
      setMessage("")
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true)
    setMessage("")

    try {
      const result = await uploadResume(selectedFile)

      if (result.success) {
        onUpload(result.parsedData)
        setMessage("✅ Resume uploaded successfully!")
      } else {
        setMessage(`❌ Error: ${result.error || "Failed to upload."}`)
      }
    } catch (error: any) {
      setMessage("❌ Network error. Try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-white rounded-md shadow-md border">
      <h2 className="text-lg font-semibold mb-2">Upload Your Resume (PDF)</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  )
}
