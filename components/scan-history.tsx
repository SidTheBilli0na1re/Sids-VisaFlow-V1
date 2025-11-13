"use client"

import { Trash2, FileText } from "lucide-react"

interface ScanHistoryProps {
  scans: any[]
  onDelete: (id: string) => void
}

export default function ScanHistory({ scans, onDelete }: ScanHistoryProps) {
  if (scans.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No scans yet</p>
        <p className="text-gray-500 text-sm mt-2">Upload and scan documents to see history</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {scans.map((scan) => (
        <div
          key={scan.id}
          className="bg-white border border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-black font-semibold">{scan.fileName}</h3>
              <p className="text-sm text-gray-600 mt-1">{scan.timestamp}</p>
            </div>
            <button
              onClick={() => onDelete(scan.id)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-black"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Found */}
            {scan.foundRequirements.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">
                  Found ({scan.foundRequirements.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {scan.foundRequirements.slice(0, 3).map((req: string) => (
                    <span key={req} className="px-2 py-1 bg-black text-white text-xs rounded-full">
                      {req}
                    </span>
                  ))}
                  {scan.foundRequirements.length > 3 && (
                    <span className="px-2 py-1 bg-gray-200 text-black text-xs rounded-full">
                      +{scan.foundRequirements.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Missing */}
            {scan.missingRequirements.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">
                  Missing ({scan.missingRequirements.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {scan.missingRequirements.slice(0, 3).map((req: string) => (
                    <span
                      key={req}
                      className="px-2 py-1 bg-gray-100 text-black text-xs rounded-full border border-gray-300"
                    >
                      {req}
                    </span>
                  ))}
                  {scan.missingRequirements.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-black text-xs rounded-full">
                      +{scan.missingRequirements.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-4">Confidence: {scan.confidence.toFixed(1)}%</p>
        </div>
      ))}
    </div>
  )
}
