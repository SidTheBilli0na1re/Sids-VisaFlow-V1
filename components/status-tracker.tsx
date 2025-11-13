"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"

interface StatusTrackerProps {
  onCheckStatus: (refNum: string) => void
  loading: boolean
  status: any
}

export default function StatusTracker({ onCheckStatus, loading, status }: StatusTrackerProps) {
  const [refNum, setRefNum] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (refNum.trim()) {
      onCheckStatus(refNum)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-black mb-6">Check Application Status</h2>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Application Reference Number</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={refNum}
                onChange={(e) => setRefNum(e.target.value)}
                placeholder="e.g., VIS-2024-123456"
                className="flex-1 px-4 py-3 border-2 border-gray-900 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              />
              <button
                type="submit"
                disabled={loading || !refNum.trim()}
                className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Check
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Status Display */}
      {status && (
        <div className="bg-white border-2 border-gray-900 rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Status</p>
              <p className="text-2xl font-bold text-black">{status.status}</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Details</p>
              <p className="text-sm text-black">{status.details}</p>
            </div>

            <div className="text-xs text-gray-600">Last updated: {status.lastUpdated}</div>
          </div>
        </div>
      )}
    </div>
  )
}
