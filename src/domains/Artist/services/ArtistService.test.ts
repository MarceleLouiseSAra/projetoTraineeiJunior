import ArtistService from "./ArtistService";
import { prismaMock } from "../../../../config/singleton";
import { QueryError } from "../../../../errors/QueryError";

describe('ArtistService', () => {

  describe('createArtist', () => {
    test('Verifica se o serviço createArtist cria corretamente um novo artista com os dados fornecidos', async () => {
      const body = {
        username: 'Test Artist',
        streams: 1000,
        profilePic: 'artist.jpg',
        joined_in: new Date(),
      };

      const createdArtist = {
        id_Artist: 1,
        username: body.username,
        streams: body.streams,
        profilePic: body.profilePic,
        joined_in: body.joined_in,
      };

      prismaMock.artist.create.mockResolvedValue(createdArtist);

      await expect(ArtistService.createArtist(body)).resolves.toEqual(createdArtist);
    });
  });

  describe('getArtistById', () => {
    test('Verifica se o serviço getArtistById retorna o artista correto com base no id solicitado', async () => {
      const requestedId = 1;
      const artist = {
        id_Artist: requestedId,
        username: 'Test Artist',
        streams: 1000,
        profilePic: 'artist.jpg',
        joined_in: new Date(),
      };

      prismaMock.artist.findUnique.mockResolvedValue(artist);

      await expect(ArtistService.getArtistById(requestedId)).resolves.toEqual(artist);
    });

    test('Se o artista com o id solicitado não existir ==> Gera erro', async () => {
      const requestedId = 999;

      prismaMock.artist.findUnique.mockResolvedValue(null);

      await expect(ArtistService.getArtistById(requestedId)).rejects.toThrow(
        new QueryError('Não existe um artista com esse id!')
      );
    });
  });

  describe('updateArtist', () => {
    test('Verifica se o serviço updateArtist atualiza corretamente o artista com o id solicitado', async () => {
      const requestedId = 1;
      const body = {
        username: 'Updated Artist',
        streams: 1500,
        profilePic: 'updated_artist.jpg',
      };

      const updatedArtist = {
        id_Artist: requestedId,
        username: body.username,
        streams: body.streams,
        profilePic: body.profilePic,
        joined_in: new Date(),
      };

      prismaMock.artist.update.mockResolvedValue(updatedArtist);

      await expect(ArtistService.updateArtist(requestedId, body)).resolves.toEqual(updatedArtist);
    });

    test('Se o artista com o id solicitado não existir para atualização ==> Gera erro', async () => {
      const requestedId = 999;
      const body = {
        username: 'Non-existent Artist',
        streams: 500,
        profilePic: 'nonexistent.jpg',
      };

      prismaMock.artist.findUnique.mockResolvedValue(null);

      await expect(ArtistService.updateArtist(requestedId, body)).rejects.toThrow(
        new QueryError('Não existe um artista com esse id para atualizar!')
      );
    });
  });

  describe('deleteArtist', () => {
    test('Verifica se o serviço deleteArtist deleta corretamente o artista com o id solicitado', async () => {
      const requestedId = 1;

      const deletedArtist = {
        id_Artist: requestedId,
        username: 'Test Artist',
        streams: 1000,
        profilePic: 'artist.jpg',
        joined_in: new Date(),
      };

      prismaMock.artist.delete.mockResolvedValue(deletedArtist);

      await expect(ArtistService.deleteArtist(requestedId)).resolves.toEqual(deletedArtist);
    });

    test('Se o artista com o id solicitado não existir para deleção ==> Gera erro', async () => {
      const requestedId = 999;

      prismaMock.artist.findUnique.mockResolvedValue(null);

      await expect(ArtistService.deleteArtist(requestedId)).rejects.toThrow(
        new QueryError('Não existe um artista com esse id para deletar!')
      );
    });
  });

});