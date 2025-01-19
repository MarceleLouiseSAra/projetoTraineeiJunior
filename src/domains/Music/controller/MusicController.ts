import MusicService from "../services/MusicService";
import { Music } from "@prisma/client";

class MusicController {
  async criarMusica(body: Music) {
    return await MusicService.createMusic(body);
  }

  async getMusicas() {
    return await MusicService.getMusics();
  }

  async getMusicaPorId(requestedId: number) {
    return await MusicService.getMusicById(requestedId);
  }

  async atualizarMusica(requestedId: number, body: Music) {
    return await MusicService.updateMusic(requestedId, body);
  }

  async deletarMusica(requestedId: number) {
    await MusicService.deleteMusic(requestedId);
  }
}

export default MusicController;
