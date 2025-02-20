import MusicService from "./MusicService";
import { prismaMock } from "../../../../config/singleton"; 
import { QueryError } from "../../../../errors/QueryError";  

describe('MusicService', () => {

  describe('createMusic', () => {

    test('Verifica se o serviço createMusic cria corretamente uma nova música com os dados fornecidos', async () => {
      const body = {
        id_Music: 1,  
        title: 'Test Music',
        genre: 'Rock',
        coverPic: 'test.jpg',
        albumId: 1,
        artistId: 1,
        released_at: new Date 
      };

      prismaMock.music.create.mockResolvedValue(body);

      await expect(MusicService.createMusic(body)).resolves.toEqual({
        title: 'Test Music',
        genre: 'Rock',
        coverPic: 'test.jpg',
        albumId: 1,
        artistId: 1,
      });
    });

  });

  describe('getMusics', () => {
    
    test('Verifica se o serviço getMusics retorna um array de músicas corretamente', async () => {
      const musics = [
        {
          id_Music: 1,
          title: 'A Music',
          genre: 'Rock',
          coverPic: 'cover1.jpg',
          released_at: new Date,
          albumId: 1,
          artistId: 1,
        },
        {
          id_Music: 2,
          title: 'B Music',
          genre: 'Pop',
          coverPic: 'cover2.jpg',
          released_at: new Date,
          albumId: 2,
          artistId: 2,
        },
      ];

      prismaMock.music.findMany.mockResolvedValue(musics);

      await expect(MusicService.getMusics()).resolves.toEqual(musics);
    });

    test('Verifica se o serviço getMusics retorna um array de músicas ordenadas por título', async () => {
      const musics = [
        {
          id_Music: 1,
          title: 'A Music',
          genre: 'Rock',
          coverPic: 'cover1.jpg',
          released_at: new Date(),
          albumId: 1,
          artistId: 1,
        },
        {
          id_Music: 2,
          title: 'B Music',
          genre: 'Pop',
          coverPic: 'cover2.jpg',
          released_at: new Date(),
          albumId: 2,
          artistId: 2,
        },
      ];

      prismaMock.music.findMany.mockResolvedValue(musics);

      await expect(MusicService.getMusics()).resolves.toEqual(musics);

      expect(prismaMock.music.findMany).toHaveBeenCalledWith({
        orderBy: {
          title: 'asc',
        },
      });
    });
  });

  describe('getMusicById', () => {

    test('Verifica se o serviço getMusicById retorna a música correta com base no id solicitado', async () => {

      const requestedId = 1;

      const music = {
        id_Music: 1,
        title: 'Test Music',
        genre: 'Rock',
        coverPic: 'cover.jpg',
        released_at: new Date(),
        albumId: 1,
        artistId: 1,
      };

      prismaMock.music.findUnique.mockResolvedValue(music);

      await expect(MusicService.getMusicById(requestedId)).resolves.toEqual(music);

    });

    test('Se a música com o id solicitado não existir ==> Gera erro', async () => {
      const requestedId = 999;

      prismaMock.music.findUnique.mockResolvedValue(null);

      await expect(MusicService.getMusicById(requestedId)).rejects.toThrow(
        new QueryError('Não existe uma música com esse id!')
      );
    });
    
  });

  describe('updateMusic', () => {

    test('Verifica se o serviço updateMusic atualiza corretamente a música com o id solicitado', async () => {
      const requestedId = 1;

      const body = {
        title: 'Updated Music',
        genre: 'Pop',
        coverPic: 'updated.jpg',
        albumId: 2,
        artistId: 2,
      };

      const updatedMusic = {
        id_Music: requestedId,
        title: body.title,
        genre: body.genre,
        coverPic: body.coverPic,
        released_at: new Date(),
        albumId: body.albumId,
        artistId: body.artistId,
      };

      prismaMock.music.update.mockResolvedValue(updatedMusic);

      await expect(MusicService.updateMusic(requestedId, body)).resolves.toEqual(updatedMusic);

    });

    test('Se a música com o id solicitado não existir para atualização ==> Gera erro', async () => {

      const requestedId = 999;

      const body = {
        title: 'Non-existent Music',
        genre: 'Pop',
        coverPic: 'nonexistent.jpg',
        albumId: 2,
        artistId: 2,
      };

      prismaMock.music.findUnique.mockResolvedValue(null);

      await expect(MusicService.updateMusic(requestedId, body)).rejects.toThrow(
        new QueryError("Não existe um usuário com esse id!")
      );

    });

  });
  
  describe('deleteMusic', () => {

    const requestedId = 999;

    test('Verifica se o serviço deleteMusic deleta corretamente a música com o id solicitado', async () => {

      const deletedMusic = {
        id_Music: requestedId,
        title: 'Test Music',
        genre: 'Rock',
        coverPic: 'cover.jpg',
        released_at: new Date,
        albumId: 1,
        artistId: 1,
      };

      prismaMock.music.findUnique.mockResolvedValue(deletedMusic);

      await expect(MusicService.deleteMusic(requestedId)).resolves.toEqual(undefined);
      
    });

    test('Se a música com o id solicitado não existir para deleção ==> Gera erro', async () => {

      prismaMock.music.findUnique.mockResolvedValue(null);

      await expect(MusicService.deleteMusic(requestedId)).rejects.toThrow(
        new QueryError("Não existe uma música com esse id!")
      ); // testa a exceção QueryError é lançada quando musicById é null

      expect(prismaMock.music.findUnique).toHaveBeenCalledWith({
        where: { id_Music : requestedId }
      }); // testa se o findUnique é chamado com o parâmetro where: { id_Music: requestedId }

      expect(prismaMock.music.delete).not.toHaveBeenCalled();

    });

  });

});