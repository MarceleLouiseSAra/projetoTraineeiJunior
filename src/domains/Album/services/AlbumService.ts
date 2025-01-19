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
    const albums = await prisma.album.findMany();
    return albums;
  }

  static async getAlbumById(id: number) {
    const album = await prisma.album.findUnique({
      where: { id_Album: id },
    });
    return album;
  }

  static async updateAlbum(id: number, body: Partial<Album>) {
    const updatedAlbum = await prisma.album.update({
      where: { id_Album: id },
      data: body,
    });
    return updatedAlbum;
  }

  static async deleteAlbum(id: number) {
    await prisma.album.delete({
      where: { id_Album: id },
    });
    return { message: "Deletado com sucesso" };
  }
    
}

export default AlbumService;
