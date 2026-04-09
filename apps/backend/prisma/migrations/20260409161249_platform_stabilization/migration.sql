-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "ragConfig" JSONB,
ADD COLUMN     "traits" JSONB,
ADD COLUMN     "widgetConfig" JSONB;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "metadata" JSONB;
