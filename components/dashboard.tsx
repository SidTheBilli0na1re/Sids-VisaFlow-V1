"use client"

export default function Dashboard({ onNavigate }: { onNavigate: (view: "scanner" | "tracker") => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-black">Choose a service</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-2xl">
        {/* Scanner Card */}
        <button
          onClick={() => onNavigate("scanner")}
          className="group relative bg-white border-2 border-gray-900 rounded-lg p-8 text-left hover:bg-black hover:text-white transition-all cursor-pointer"
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">Scan Documents</h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-300">
              Upload and extract text from visa documents with OCR
            </p>
          </div>
        </button>

        {/* Tracker Card */}
        <button
          onClick={() => onNavigate("tracker")}
          className="group relative bg-white border-2 border-gray-900 rounded-lg p-8 text-left hover:bg-black hover:text-white transition-all cursor-pointer"
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">Track Application</h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-300">
              Check your visa application status using your reference number
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}
