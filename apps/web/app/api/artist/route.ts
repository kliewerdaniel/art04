import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createArtistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  handle: z.string().min(1, 'Handle is required'),
  bio: z.string().min(1, 'Bio is required'),
  contactPref: z.string().min(1, 'Contact preference is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createArtistSchema.parse(body)
    
    const artist = await prisma.artist.create({
      data: validatedData,
    })
    
    return NextResponse.json(artist)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// Example request:
// POST /api/artist
// {
//   "name": "John Doe",
//   "handle": "johndoe_artist",
//   "bio": "Local artist focusing on street art",
//   "contactPref": "email"
// }

// Example response:
// {
//   "id": "cld1qyxvd0000123abcd",
//   "name": "John Doe",
//   "handle": "johndoe_artist",
//   "bio": "Local artist focusing on street art",
//   "contactPref": "email",
//   "createdAt": "2023-04-15T10:30:00.000Z"
// }
