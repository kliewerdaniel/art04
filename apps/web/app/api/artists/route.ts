import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const artists = await prisma.artist.findMany({
      select: {
        id: true,
        name: true,
        handle: true,
        bio: true,
        contactPref: true,
        createdAt: true,
        artworks: true,
        interactions: true,
        assessments: true,
        allocations: true,
        siteExports: true,
      },
    })
    
    return NextResponse.json(artists)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// Example response:
// [
//   {
//     "id": "cld1qyxvd0000123abcd",
//     "name": "John Doe",
//     "handle": "johndoe_artist",
//     "bio": "Local artist focusing on street art",
//     "contactPref": "email",
//     "createdAt": "2023-04-15T10:30:00.000Z",
//     "artworks": [],
//     "interactions": [],
//     "assessments": [],
//     "allocations": [],
//     "siteExports": []
//   }
// ]
