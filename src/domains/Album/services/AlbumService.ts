import prisma from "../../../../database/prismaClient";
import { Album } from "@prisma/client";

class AlbumService {
  static async createAlbum(body: Album) {
    const album = {
      title: body.title,
      genre: body.genre,
      coverPic: body.coverPic,
      artistId: body.artistId,
    } as Album;

    await prisma.album.create({ data: album });
    return album;
  }

  static async getAlbums() {
    const albums = await prisma.album.findMany({ orderBy: { title: "asc" } });
    return albums;
  }

  static async getAlbumById(requestedId: number) {
    const albumById = await prisma.album.findUnique({
      where: { id_Album: requestedId },
    });
    return albumById;
  }

  static async updateAlbum(requestedId: number, body: Partial<Album>) {
    const updatedAlbum = await prisma.album.update({
      where: { id_Album: requestedId },
      data: body,
    });
    return updatedAlbum;
  }

  static async deleteAlbum(requestedId: number) {
    await prisma.album.delete({
      where: { id_Album: requestedId },
    });
  }
}

export default AlbumService;
