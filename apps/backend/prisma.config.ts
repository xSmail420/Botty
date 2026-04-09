import path from 'node:path'
import { defineConfig } from 'prisma/config'
import dotenv from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg'

dotenv.config({ path: path.join(__dirname, '.env') })

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    adapter: () => {
      const connectionString = process.env.DATABASE_URL!
      return new PrismaPg({ connectionString })
    }
  }
})