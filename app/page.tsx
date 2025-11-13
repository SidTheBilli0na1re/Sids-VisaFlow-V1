"use client"

import { useState } from "react"
import Dashboard from "@/components/dashboard"
import ScannerView from "@/components/scanner-view"
import TrackerView from "@/components/tracker-view"

export default function Home() {
  const [view, setView] = useState<"dashboard" | "scanner" | "tracker">("dashboard")

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b border-gray-900 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setView("dashboard")}
            className="text-xl font-semibold text-black hover:opacity-70 transition-opacity"
          >
            Sid's VisaFlow
          </button>
          {view !== "dashboard" && (
            <button
              onClick={() => setView("dashboard")}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Back to Menu
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {view === "dashboard" && <Dashboard onNavigate={setView} />}
        {view === "scanner" && <ScannerView />}
        {view === "tracker" && <TrackerView />}
      </main>
    </div>
  )
}
