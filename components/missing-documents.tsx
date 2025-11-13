"use client"

import { CheckCircle2 } from "lucide-react"

interface MissingDocumentsProps {
  scans: any[]
}

export default function MissingDocuments({ scans }: MissingDocumentsProps) {
  if (scans.length === 0) return null

  // Combine all missing documents from all scans
  const allMissing = new Set<string>()
  scans.forEach((scan) => {
    scan.missingRequirements.forEach((req: string) => {
      allMissing.add(req)
    })
  })

  const completionPercentage = Math.round(((100 - (allMissing.size / 9) * 100) * 100) / 100)

  return (
    <div className="sticky top-24 space-y-4">
      {/* Progress Card */}
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h3 className="text-black font-semibold mb-4">Overall Progress</h3>
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-black">{completionPercentage}%</span>
            <span className="text-sm text-gray-600">Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-black h-3 rounded-full transition-all" style={{ width: `${completionPercentage}%` }} />
          </div>
        </div>
      </div>

      {/* Missing Summary */}
      {allMissing.size > 0 && (
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h4 className="text-black font-semibold mb-3">Still Needed</h4>
          <div className="space-y-2">
            {Array.from(allMissing).map((doc) => (
              <div
                key={doc}
                className="flex items-center gap-2 text-sm text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-2 h-2 bg-black rounded-full" />
                {doc}
              </div>
            ))}
          </div>
        </div>
      )}

      {allMissing.size === 0 && (
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-black flex-shrink-0" />
            <div>
              <p className="text-black font-semibold">All Documents Found!</p>
              <p className="text-sm text-gray-700 mt-1">Your visa application is complete.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
