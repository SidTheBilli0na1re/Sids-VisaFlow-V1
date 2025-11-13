"use client"

import { useState } from "react"
import StatusTracker from "@/components/status-tracker"
import NotificationSetup from "@/components/notification-setup"

export default function TrackerView() {
  const [referenceNumber, setReferenceNumber] = useState("")
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleCheckStatus = async (refNum: string) => {
    setLoading(true)
    // Simulate API call to government database
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock status data - in production, this would query the government API
    const mockStatuses = ["Received", "In Process", "Under Review", "Approved", "Rejected"]
    const mockStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)]

    setStatus({
      referenceNumber: refNum,
      status: mockStatus,
      lastUpdated: new Date().toLocaleString(),
      details: `Your application is currently ${mockStatus.toLowerCase()}. You will receive an email notification when there are any updates.`,
    })
    setLoading(false)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <StatusTracker onCheckStatus={handleCheckStatus} loading={loading} status={status} />
      {status && <NotificationSetup referenceNumber={referenceNumber} />}
    </div>
  )
}
