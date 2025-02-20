import prisma from "../../../../database/prismaClient";
import { Album } from "@prisma/client";
import { QueryError } from "../../../../errors/QueryError";

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

    if (albumById) {
      return albumById;
    } else {
      throw new QueryError("Não existe um usuário com esse id!");
    }

  }

  static async updateAlbum(requestedId: number, body: Partial<Album>) {
    const updatedAlbum = await prisma.album.update({
      where: { id_Album: requestedId },
      data: body,
    });

    if (updatedAlbum) {
      return updatedAlbum;
    } else {
      throw new QueryError("Não existe um usuário com esse id!");
    }

  }

  static async deleteAlbum(requestedId: number) {
    const album = await AlbumService.getAlbumById(requestedId);

    if (album) {
      await prisma.album.delete({ where: { id_Album: requestedId } });
    } else {
      throw new QueryError("Não existe um álbum com esse id!");
    }

  }
}

export default AlbumService;
