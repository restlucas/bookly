/*
  Warnings:

  - You are about to drop the column `ProfileId` on the `ProfessionalScheduling` table. All the data in the column will be lost.
  - You are about to drop the column `ProfileId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `ProfessionalScheduling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProfessionalScheduling" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profileId" TEXT NOT NULL,
    "weekDay" INTEGER NOT NULL,
    "timeStartInMinutes" INTEGER NOT NULL,
    "timeEndInMinutes" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProfessionalScheduling_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProfessionalScheduling" ("createdAt", "id", "timeEndInMinutes", "timeStartInMinutes", "updatedAt", "weekDay") SELECT "createdAt", "id", "timeEndInMinutes", "timeStartInMinutes", "updatedAt", "weekDay" FROM "ProfessionalScheduling";
DROP TABLE "ProfessionalScheduling";
ALTER TABLE "new_ProfessionalScheduling" RENAME TO "ProfessionalScheduling";
CREATE UNIQUE INDEX "ProfessionalScheduling_profileId_key" ON "ProfessionalScheduling"("profileId");
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
