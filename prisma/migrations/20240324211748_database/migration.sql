-- CreateEnum
CREATE TYPE "PrintRequestStatus" AS ENUM ('WAITING', 'PROCESSING', 'DONE');

-- CreateTable
CREATE TABLE "PrintRequests" (
    "id" SERIAL NOT NULL,
    "printDate" TIMESTAMP(3) NOT NULL,
    "status" "PrintRequestStatus" NOT NULL,
    "userId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,

    CONSTRAINT "PrintRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PrintRequests" ADD CONSTRAINT "PrintRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintRequests" ADD CONSTRAINT "PrintRequests_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
