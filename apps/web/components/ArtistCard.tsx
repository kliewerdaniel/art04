import Image from "next/image"
import Link from "next/link"

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

interface ArtistCardProps {
  artist: Artist
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { id, name, handle, bio, contactPref, createdAt, artworks = [] } = artist

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Placeholder for artist image - could be from artworks or profile */}
      <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
        <svg className="w-16 h-16 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            @{handle}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {bio}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>Prefers: {contactPref}</span>
          <span>Joined {new Date(createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{artworks.length} artworks</span>
            <span>{artist.interactions?.length || 0} interactions</span>
          </div>

          <Link
            href={`/artists/${id}`}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
          >
            View Profile →
          </Link>
        </div>
      </div>
    </div>
  )
}
