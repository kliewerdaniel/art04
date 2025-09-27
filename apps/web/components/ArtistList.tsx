"use client"

import { useState, useEffect } from "react"
import ArtistCard from "./ArtistCard"

interface Artist {
  id: string
  name: string
  bio: string
  imagePath?: string
}

export default function ArtistList() {
  const [artists, setArtists] = useState<Artist[]>([])

  useEffect(() => {
    // TODO: Fetch from API
    setArtists([
      { id: '1', name: 'Artist 1', bio: 'Example bio' },
      { id: '2', name: 'Artist 2', bio: 'Another bio' },
    ])
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} {...artist} />
      ))}
    </div>
  )
}
