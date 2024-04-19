-- CreateTable
CREATE TABLE "Cart" (
    "userId" INTEGER NOT NULL,
    "cartData" JSONB NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
