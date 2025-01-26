import { PrismaClient, Artist } from "@prisma/client";

const prisma = new PrismaClient();

class ArtistService {
  static async createArtist(body: Omit<Artist, "id_Artist">) {
    const artist = {
      username: body.username,
      streams: body.streams || 0,
      profilePic: body.profilePic,
      joined_in: body.joined_in || new Date(),
    };

    const createdArtist = await prisma.artist.create({ data: artist });
    return createdArtist;
  }
  static async getArtists() {
    const artists = await prisma.artist.findMany({
      orderBy: { username: "asc" },
    });
    return artists;
  }
  static async getArtistById(requestedId: number) {
    const artist = await prisma.artist.findFirst({
      where: { id_Artist: requestedId },
    });
    return artist;
  }
  static async updateArtist(requestedId: number, body: any) {
    const updatedArtist = await prisma.artist.update({
      data: {
        username: body.username,
        streams: body.streams,
        profilePic: body.profilePic,
      },
      where: { id_Artist: requestedId },
    });

    return updatedArtist;
  }
  static async deleteArtist(requestedId: number) {
    await prisma.artist.delete({ where: { id_Artist: requestedId } });
  }
}

export default ArtistService;
