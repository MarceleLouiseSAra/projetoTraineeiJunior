import AlbumService from "../services/AlbumService";
import { Album } from "@prisma/client";

class AlbumController {
  async criarAlbum(body: Album) {
    return await AlbumService.createAlbum(body);
  }

  async getAlbums() {
    return await AlbumService.getAlbums();
  }

  async getAlbumById(requestedId: number) {
    return await AlbumService.getAlbumById(requestedId);
  }

  async atualizarAlbum(requestedId: number, body: Album) {
    return await AlbumService.updateAlbum(requestedId, body);
  }

  async deletarAlbum(requestedId: number) {
    await AlbumService.deleteAlbum(requestedId);
  }
}

export default AlbumController;
