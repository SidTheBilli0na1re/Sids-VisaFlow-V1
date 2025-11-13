"use client"

import type React from "react"

import { useRef, useState } from "react"
import Tesseract from "tesseract.js"
import { Upload, Loader2, CheckCircle2 } from "lucide-react"

interface DocumentScannerProps {
  onScan: (scan: any) => void
}

const VISA_REQUIREMENTS = [
  "Passport",
  "Visa Application Form",
  "Travel Dates",
  "Flight Tickets",
  "Hotel Booking",
  "Travel Insurance",
  "Bank Statement",
  "Employment Letter",
  "Visa Fee Receipt",
]

export default function DocumentScanner({ onScan }: DocumentScannerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string>("")
  const [result, setResult] = useState<any>(null)
  const [progress, setProgress] = useState(0)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setProgress(0)

    // Preview image
    const reader = new FileReader()
    reader.onload = (event) => setPreview(event.target?.result as string)
    reader.readAsDataURL(file)

    try {
      const result = await Tesseract.recognize(file, "eng", {
        logger: (m: any) => {
          if (m.status === "recognizing") {
            setProgress(Math.round(m.progress * 100))
          }
        },
      })

      const text = result.data.text.toUpperCase()
      const foundRequirements = VISA_REQUIREMENTS.filter((req) => text.includes(req.toUpperCase()))

      const scan = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        fileName: file.name,
        extractedText: result.data.text,
        foundRequirements,
        missingRequirements: VISA_REQUIREMENTS.filter((req) => !foundRequirements.includes(req)),
        confidence: result.data.confidence,
      }

      setResult(scan)
      onScan(scan)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      setTimeout(() => {
        setPreview("")
        setResult(null)
        setProgress(0)
      }, 3000)
    } catch (error) {
      console.error("OCR Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div onClick={() => fileInputRef.current?.click()} className="relative group cursor-pointer">
        <div className="relative bg-white border-2 border-dashed border-gray-300 hover:border-black rounded-lg p-12 transition-all text-center">
          <div className="flex flex-col items-center gap-4">
            {!loading && !preview && (
              <>
                <Upload className="w-12 h-12 text-black" />
                <div>
                  <p className="text-lg font-semibold text-black">Upload document image</p>
                  <p className="text-sm text-gray-600 mt-1">PNG, JPG, or PDF (max 10MB)</p>
                </div>
              </>
            )}
            {loading && (
              <>
                <Loader2 className="w-12 h-12 text-black animate-spin" />
                <div className="w-full max-w-xs">
                  <p className="text-black font-medium mb-2">Scanning document...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-black h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{progress}%</p>
                </div>
              </>
            )}
            {preview && !loading && (
              <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-64 rounded-lg object-cover" />
            )}
          </div>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={handleFileSelect} className="hidden" />
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-black font-semibold">Scan Complete</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {result.foundRequirements.length} of {VISA_REQUIREMENTS.length} documents detected
                </p>
              </div>
            </div>
          </div>

          {/* Found Requirements */}
          {result.foundRequirements.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-black font-semibold mb-3">Found Documents</h4>
              <div className="flex flex-wrap gap-2">
                {result.foundRequirements.map((req: string) => (
                  <span key={req} className="px-3 py-1.5 bg-black text-white text-sm rounded-full">
                    {req}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Requirements */}
          {result.missingRequirements.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-black font-semibold mb-3">Missing Documents</h4>
              <div className="flex flex-wrap gap-2">
                {result.missingRequirements.map((req: string) => (
                  <span
                    key={req}
                    className="px-3 py-1.5 bg-gray-100 text-black text-sm rounded-full border border-gray-300"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Confidence */}
          <div className="text-xs text-gray-600 text-center">OCR Confidence: {result.confidence.toFixed(1)}%</div>
        </div>
      )}
    </div>
  )
}
