import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createAllocationSchema = z.object({
  volunteerId: z.string().min(1, 'Volunteer ID is required'),
  artistId: z.string().min(1, 'Artist ID is required'),
  timeMinutes: z.number().min(0, 'Time must be non-negative'),
  moneyCents: z.number().int().min(0, 'Money must be non-negative'),
  purpose: z.string().min(1, 'Purpose is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createAllocationSchema.parse(body)
    
    const allocation = await prisma.allocation.create({
      data: validatedData,
    })
    
    return NextResponse.json(allocation)
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
// POST /api/allocation
// {
//   "volunteerId": "clm2rzyxw0000456efgh",
//   "artistId": "cld1qyxvd0000123abcd",
//   "timeMinutes": 120,
//   "moneyCents": 5000,
//   "purpose": "Art supplies and mentorship"
// }

// Example response:
// {
//   "id": "cls5iefg00001122qrst",
//   "volunteerId": "clm2rzyxw0000456efgh",
//   "artistId": "cld1qyxvd0000123abcd",
//   "timeMinutes": 120,
//   "moneyCents": 5000,
//   "purpose": "Art supplies and mentorship",
//   "createdAt": "2023-04-15T10:30:00.000Z"
// }
