import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { encrypt } from '@/lib/encrypt'

const prisma = new PrismaClient()

const createAssessmentSchema = z.object({
  artistId: z.string().min(1, 'Artist ID is required'),
  type: z.enum(['PHQ-9', 'GAD-7'], {
    errorMap: () => ({ message: 'Type must be PHQ-9 or GAD-7' }),
  }),
  answers: z.string().min(1, 'Answers are required'), // JSON string
  score: z.number(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createAssessmentSchema.parse(body)

    // Encrypt sensitive answers
    const encryptedAnswers = encrypt(validatedData.answers)

    const assessment = await prisma.assessment.create({
      data: {
        ...validatedData,
        answers: encryptedAnswers,
      },
    })

    // Remove encrypted answers from response
    const { answers, ...responseData } = assessment

    return NextResponse.json(responseData)
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
// POST /api/assessment
// {
//   "artistId": "cld1qyxvd0000123abcd",
//   "type": "PHQ-9",
//   "answers": "{\"q1\":2,\"q2\":1}",
//   "score": 3
// }

// Example response:
// {
//   "id": "clr4pnha00009712mnop",
//   "artistId": "cld1qyxvd0000123abcd",
//   "type": "PHQ-9",
//   "answers": "{\"q1\":2,\"q2\":1}",
//   "score": 3,
//   "createdAt": "2023-04-15T10:30:00.000Z"
// }
