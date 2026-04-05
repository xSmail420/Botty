import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}

export class PrismaService {
  private static instance: PrismaClient

  public static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      PrismaService.instance = createPrismaClient()
    }
    return PrismaService.instance
  }
}

export const prisma = PrismaService.getInstance()