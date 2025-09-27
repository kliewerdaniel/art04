import Image from "next/image"

interface ArtistCardProps {
  id: string
  name: string
  bio: string
  imagePath?: string
}

export default function ArtistCard({ id, name, bio, imagePath }: ArtistCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {imagePath && (
        <Image src={imagePath} alt={name} width={300} height={200} className="w-full h-48 object-cover rounded-md mb-4" />
      )}
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{bio}</p>
    </div>
  )
}
