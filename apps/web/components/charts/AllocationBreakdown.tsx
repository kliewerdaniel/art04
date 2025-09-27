"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface AllocationData {
  name: string
  value: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function AllocationBreakdown() {
  const [data, setData] = useState<AllocationData[]>([])

  useEffect(() => {
    // Mock data - replace with real API call: fetch('/api/allocation-breakdown')
    setData([
      { name: 'Mentorship', value: 5000 },
      { name: 'Art Supplies', value: 3000 },
      { name: 'Housing', value: 2000 },
      { name: 'Health Care', value: 1000 },
    ])
  }, [])

  return (
    <div className="w-full h-96">
      <h3 className="text-lg font-semibold mb-4">Allocation Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
