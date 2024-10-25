/*
  Warnings:

  - You are about to drop the column `servicePreference` on the `Profile` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "professionId" TEXT,
    "professionCategoryId" TEXT,
    "bio" TEXT,
    "serviceType" TEXT,
    "serviceValue" TEXT,
    "tags" TEXT,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Profile_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Profile_professionCategoryId_fkey" FOREIGN KEY ("professionCategoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("bio", "id", "professionCategoryId", "professionId", "serviceValue", "tags", "userId") SELECT "bio", "id", "professionCategoryId", "professionId", "serviceValue", "tags", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
CREATE UNIQUE INDEX "Profile_professionId_key" ON "Profile"("professionId");
CREATE UNIQUE INDEX "Profile_professionCategoryId_key" ON "Profile"("professionCategoryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
