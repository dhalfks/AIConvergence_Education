-- CreateTable
CREATE TABLE "MasterTerm" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "termLower" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MasterTerm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterTerm_termLower_key" ON "MasterTerm"("termLower");
