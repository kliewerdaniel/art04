import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createInteractionSchema = z.object({
  artistId: z.string().min(1, 'Artist ID is required'),
  volunteerId: z.string().min(1, 'Volunteer ID is required'),
  type: z.enum(['mentorship', 'donation', 'purchase'], {
    errorMap: () => ({ message: 'Type must be mentorship, donation, or purchase' }),
  }),
  quantity: z.number().int().min(1).optional(),
  money: z.number().min(0).optional(),
  notes: z.string().optional(),
  location: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createInteractionSchema.parse(body)
    
    const interaction = await prisma.interaction.create({
      data: validatedData,
    })
    
    return NextResponse.json(interaction)
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
// POST /api/interaction
// {
//   "artistId": "cld1qyxvd0000123abcd",
//   "volunteerId": "clm2rzyxw0000456efgh",
//   "type": "mentorship",
//   "quantity": 2,
//   "notes": "Art lesson session"
// }

// Example response:
// {
//   "id": "clp3oszd00006789ijkl",
//   "artistId": "cld1qyxvd0000123abcd",
//   "volunteerId": "clm2rzyxw0000456efgh",
//   "type": "mentorship",
//   "quantity": 2,
//   "money": null,
//   "notes": "Art lesson session",
//   "timestamp": "2023-04-15T10:30:00.000Z",
//   "location": null
// }
