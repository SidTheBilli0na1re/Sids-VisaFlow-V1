"use client"

import { useEffect, useState } from "react"
import DocumentScanner from "@/components/document-scanner"
import ScanHistory from "@/components/scan-history"
import MissingDocuments from "@/components/missing-documents"

export default function ScannerView() {
  const [scans, setScans] = useState<any[]>([])
  const [activeView, setActiveView] = useState<"scanner" | "history">("scanner")

  useEffect(() => {
    const saved = localStorage.getItem("visa-scans")
    if (saved) setScans(JSON.parse(saved))
  }, [])

  const handleNewScan = (scan: any) => {
    const updated = [scan, ...scans]
    setScans(updated)
    localStorage.setItem("visa-scans", JSON.stringify(updated))
  }

  const handleDelete = (id: string) => {
    const updated = scans.filter((s) => s.id !== id)
    setScans(updated)
    localStorage.setItem("visa-scans", JSON.stringify(updated))
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveView("scanner")}
          className={`pb-4 font-medium transition-colors ${
            activeView === "scanner" ? "text-black border-b-2 border-black -mb-[2px]" : "text-gray-600 hover:text-black"
          }`}
        >
          Scanner
        </button>
        <button
          onClick={() => setActiveView("history")}
          className={`pb-4 font-medium transition-colors ${
            activeView === "history" ? "text-black border-b-2 border-black -mb-[2px]" : "text-gray-600 hover:text-black"
          }`}
        >
          History ({scans.length})
        </button>
      </div>

      {activeView === "scanner" ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <DocumentScanner onScan={handleNewScan} />
          </div>
          <div>{scans.length > 0 && <MissingDocuments scans={scans} />}</div>
        </div>
      ) : (
        <ScanHistory scans={scans} onDelete={handleDelete} />
      )}
    </div>
  )
}
