import ArtistService from "../services/ArtistService";
import { Artist } from "@prisma/client";

class ArtistController {
  async criarArtista(body: Omit<Artist, "id_Artist">) {
    return await ArtistService.createArtist(body);
  }

  async getArtistas() {
    return await ArtistService.getArtists();
  }

  async getArtistaPorId(requestedId: number) {
    return await ArtistService.getArtistById(requestedId);
  }

  async atualizarArtista(requestedId: number, body: Partial<Omit<Artist, "id_Artist">>) {
    return await ArtistService.updateArtist(requestedId, body);
  }

  async deletarArtista(requestedId: number) {
    await ArtistService.deleteArtist(requestedId);
  }
  
}

export default ArtistController;