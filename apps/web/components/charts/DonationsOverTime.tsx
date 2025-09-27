"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface DonationData {
  month: string
  donations: number
}

export default function DonationsOverTime() {
  const [data, setData] = useState<DonationData[]>([])

  useEffect(() => {
    // Mock data - replace with real API call: fetch('/api/donations-over-time')
    setData([
      { month: "Jan", donations: 1200 },
      { month: "Feb", donations: 1800 },
      { month: "Mar", donations: 2200 },
      { month: "Apr", donations: 2800 },
      { month: "May", donations: 3200 },
      { month: "Jun", donations: 3800 },
    ])
  }, [])

  return (
    <div className="w-full h-96">
      <h3 className="text-lg font-semibold mb-4">Donations Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, 'Donations']} />
          <Legend />
          <Line type="monotone" dataKey="donations" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
