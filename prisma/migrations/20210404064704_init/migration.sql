-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "AuthStrategy" AS ENUM ('PASSWORD');

-- CreateEnum
CREATE TYPE "AccessTokenStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "imageId" INTEGER,
    "idNumber" VARCHAR(255),
    "displayName" VARCHAR(255) NOT NULL,
    "titleName" VARCHAR(255),
    "firstName" VARCHAR(255),
    "middleName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "birthdate" TIMESTAMP(3),
    "phoneNumber" VARCHAR(255),
    "email" VARCHAR(255),
    "address" VARCHAR(255),
    "note" VARCHAR(255),
    "status" "UserStatus" NOT NULL DEFAULT E'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_password" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "activeToken" TEXT,
    "resetToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_token" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "authStrategy" "AuthStrategy" NOT NULL,
    "info" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fcmRegistrationToken" VARCHAR(1024),
    "otpNumber" INTEGER,
    "status" "AccessTokenStatus" NOT NULL DEFAULT E'ACTIVE',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_password_userId_unique" ON "auth_password"("userId");

-- AddForeignKey
ALTER TABLE "auth_password" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_token" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
