// src/components/SplineViewer.tsx
import { useState } from "react"

interface Props {
  url: string
  height?: string
}

export default function SplineViewer({ url, height = "500px" }: Props) {
  const [loading, setLoading] = useState(true)

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden shadow-md border"
      style={{ height }}
    >
      {loading && (
        <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}

      <iframe
        src={url}
        className="w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen"
        title="Spline 3D Viewer"
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}
