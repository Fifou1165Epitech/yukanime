-- CreateTable
CREATE TABLE "public"."quote" (
    "id" SERIAL NOT NULL,
    "quote" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "manga" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "chapter" TEXT,
    "episode" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "quote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."quote" ADD CONSTRAINT "quote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
