"use client"

import type React from "react"

import { useState } from "react"
import { Bell } from "lucide-react"

export default function NotificationSetup({ referenceNumber }: { referenceNumber: string }) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email || phone) {
      // In production, this would save to a backend database for periodic checking
      localStorage.setItem(
        "visa-notification",
        JSON.stringify({
          referenceNumber,
          email,
          phone,
          subscribedAt: new Date().toISOString(),
        }),
      )
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <div className="bg-white border-2 border-gray-900 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-black" />
        <h3 className="text-lg font-semibold text-black">Get Status Updates</h3>
      </div>

      <p className="text-sm text-gray-600">
        We'll periodically check the government database and notify you of any status changes via your preferred method.
      </p>

      <form onSubmit={handleSubscribe} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-black mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 py-2 border border-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Phone (optional)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="w-full px-3 py-2 border border-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-black text-white rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
        >
          Subscribe to Updates
        </button>
      </form>

      {subscribed && (
        <p className="text-xs text-black font-medium">Subscribed! You'll receive updates when status changes.</p>
      )}
    </div>
  )
}
