import prisma from "../../../../database/prismaClient";
import { Music } from "@prisma/client";
import { QueryError } from "../../../../errors/QueryError";

class MusicService {
  static async createMusic(body: Music) {
    const music = {
      title: body.title,
      genre: body.genre,
      coverPic: body.coverPic,
      albumId: body.albumId,
      artistId: body.artistId,
    } as Music;

    await prisma.music.create({ data: music });
    return music;
  }

  static async getMusics() {
    const musics = await prisma.music.findMany({
      orderBy: { title: "asc" },
    });
    return musics;
  }

  static async getMusicById(requestedId: number) {
    const music = await prisma.music.findUnique({
      where: { id_Music: requestedId },
    });
    if (music) {
      return music;
    } else {
      throw new QueryError("Não existe uma música com esse id!");
    }
  }

  static async getMusicsHeardByUser(userId: number) {
    const musics = await prisma.musicsOnUsers.findMany({
      where: { userId },
      include: { music: true },
    });
  
    return musics.map((entry: { music: Music }) => entry.music);
  }
  
  static async updateMusic(requestedId: number, body: Music) {
    const updatedMusic = await prisma.music.update({
      data: {
        title: body.title,
        genre: body.genre,
        coverPic: body.coverPic,
        albumId: body.albumId,
        artistId: body.artistId,
      },
      where: { id_Music: requestedId },
    });

    return updatedMusic;
  }

  static async deleteMusic(requestedId: number) {
    await prisma.music.delete({ where: { id_Music: requestedId } });
  }
}

export default MusicService;
