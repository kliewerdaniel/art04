"use client"

import { useState, useEffect } from "react"
import ArtistCard from "./ArtistCard"

interface Artist {
  id: string
  name: string
  handle: string
  bio: string
  contactPref: string
  createdAt: string
  artworks?: any[]
  interactions?: any[]
  assessments?: any[]
  allocations?: any[]
  siteExports?: any[]
}

export default function ArtistList() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArtists()
  }, [])

  const fetchArtists = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/artists')

      if (!response.ok) {
        throw new Error('Failed to fetch artists')
      }

      const data = await response.json()
      setArtists(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={fetchArtists}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (artists.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No artists found.</p>
        <p className="text-sm text-gray-500">
          Be the first to add an artist profile to our platform!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  )
}
