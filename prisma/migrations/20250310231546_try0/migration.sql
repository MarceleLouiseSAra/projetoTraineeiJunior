-- CreateTable
CREATE TABLE `User` (
    `id_User` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `admin` VARCHAR(191) NOT NULL,
    `profilePic` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id_User`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artist` (
    `id_Artist` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `streams` INTEGER NOT NULL,
    `profilePic` VARCHAR(191) NULL,
    `joined_in` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_Artist`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Album` (
    `id_Album` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `coverPic` VARCHAR(191) NULL,
    `released_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `artistId` INTEGER NOT NULL,

    PRIMARY KEY (`id_Album`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Music` (
    `id_Music` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `coverPic` VARCHAR(191) NULL,
    `released_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `albumId` INTEGER NOT NULL,
    `artistId` INTEGER NOT NULL,

    PRIMARY KEY (`id_Music`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicsOnUsers` (
    `userId` INTEGER NOT NULL,
    `musicId` INTEGER NOT NULL,

    UNIQUE INDEX `MusicsOnUsers_userId_key`(`userId`),
    UNIQUE INDEX `MusicsOnUsers_musicId_key`(`musicId`),
    PRIMARY KEY (`userId`, `musicId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlbumsOnUsers` (
    `userId` INTEGER NOT NULL,
    `albumId` INTEGER NOT NULL,

    UNIQUE INDEX `AlbumsOnUsers_userId_key`(`userId`),
    UNIQUE INDEX `AlbumsOnUsers_albumId_key`(`albumId`),
    PRIMARY KEY (`userId`, `albumId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistsOnUsers` (
    `userId` INTEGER NOT NULL,
    `artistId` INTEGER NOT NULL,

    UNIQUE INDEX `ArtistsOnUsers_userId_key`(`userId`),
    UNIQUE INDEX `ArtistsOnUsers_artistId_key`(`artistId`),
    PRIMARY KEY (`userId`, `artistId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id_Artist`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Music` ADD CONSTRAINT `Music_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id_Album`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Music` ADD CONSTRAINT `Music_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id_Artist`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicsOnUsers` ADD CONSTRAINT `MusicsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicsOnUsers` ADD CONSTRAINT `MusicsOnUsers_musicId_fkey` FOREIGN KEY (`musicId`) REFERENCES `Music`(`id_Music`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumsOnUsers` ADD CONSTRAINT `AlbumsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumsOnUsers` ADD CONSTRAINT `AlbumsOnUsers_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id_Album`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistsOnUsers` ADD CONSTRAINT `ArtistsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistsOnUsers` ADD CONSTRAINT `ArtistsOnUsers_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id_Artist`) ON DELETE RESTRICT ON UPDATE CASCADE;
