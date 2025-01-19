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
}

export default AlbumService;
