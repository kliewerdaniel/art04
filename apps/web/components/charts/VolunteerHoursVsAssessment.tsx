"use client"

import { useState, useEffect } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface AssessmentData {
  volunteerHours: number
  phq9Score: number
  gad7Score: number
}

export default function VolunteerHoursVsAssessment() {
  const [data, setData] = useState<AssessmentData[]>([])

  useEffect(() => {
    // Mock data - replace with real API call: fetch('/api/volunteer-hours-vs-assessments')
    setData([
      { volunteerHours: 10, phq9Score: 5, gad7Score: 8 },
      { volunteerHours: 20, phq9Score: 12, gad7Score: 15 },
      { volunteerHours: 30, phq9Score: 18, gad7Score: 20 },
      { volunteerHours: 40, phq9Score: 8, gad7Score: 10 },
      { volunteerHours: 50, phq9Score: 2, gad7Score: 4 },
      { volunteerHours: 60, phq9Score: 3, gad7Score: 6 },
    ])
  }, [])

  return (
    <div className="w-full h-96">
      <h3 className="text-lg font-semibold mb-4">Volunteer Hours vs Mental Health Scores</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="volunteerHours" type="number" name="Hours" unit="h" />
          <YAxis dataKey="phq9Score" type="number" name="Score" domain={[0, 30]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="PHQ-9 Score" dataKey="phq9Score" fill="#8884d8" />
          <Scatter name="GAD-7 Score" dataKey="gad7Score" fill="#82ca9d" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
