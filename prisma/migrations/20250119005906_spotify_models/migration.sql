-- CreateTable
CREATE TABLE "User" (
    "id_User" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "profilePic" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Artist" (
    "id_Artist" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "streams" INTEGER NOT NULL,
    "profilePic" TEXT,
    "joined_in" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Album" (
    "id_Album" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "coverPic" TEXT,
    "released_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "artistId" INTEGER NOT NULL,
    CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id_Artist") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Music" (
    "id_Music" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "coverPic" TEXT,
    "released_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "albumId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,
    CONSTRAINT "Music_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id_Album") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Music_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id_Artist") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MusicsOnUsers" (
    "userId" INTEGER NOT NULL,
    "musicId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "musicId"),
    CONSTRAINT "MusicsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id_User") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MusicsOnUsers_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music" ("id_Music") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AlbumsOnUsers" (
    "userId" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "albumId"),
    CONSTRAINT "AlbumsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id_User") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AlbumsOnUsers_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id_Album") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArtistsOnUsers" (
    "userId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "artistId"),
    CONSTRAINT "ArtistsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id_User") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArtistsOnUsers_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id_Artist") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_artistId_key" ON "Album"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Music_albumId_key" ON "Music"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "Music_artistId_key" ON "Music"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "MusicsOnUsers_userId_key" ON "MusicsOnUsers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MusicsOnUsers_musicId_key" ON "MusicsOnUsers"("musicId");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumsOnUsers_userId_key" ON "AlbumsOnUsers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumsOnUsers_albumId_key" ON "AlbumsOnUsers"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistsOnUsers_userId_key" ON "ArtistsOnUsers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistsOnUsers_artistId_key" ON "ArtistsOnUsers"("artistId");
