import AlbumService from "./AlbumService";
import { prismaMock } from "../../../../config/singleton";
import { QueryError } from "../../../../errors/QueryError";

describe('createAlbum', () => {

    test('Verifica se o serviço createAlbum cria corretamente uma nova álbum com os dados fornecidos', async () => {

        const album = {
            id_Album: 1,  
            title: 'Aos Vivos',
            genre: 'MPB',
            coverPic: "coverPic.png",
            artistId: 1,
            released_at: new Date
        };

        prismaMock.album.create.mockResolvedValue(album);

        await expect(AlbumService.createAlbum(album)).resolves.toEqual({
            title: 'Aos Vivos',
            genre: 'MPB',
            coverPic: "coverPic.png",
            artistId: 1,
        })

    });

});

describe('getAlbums', () => {

    test('Verifica se o serviço getAlbums retorna um array de álbums corretamente', async () => {

        const albums = [
            {
                id_Album: 1,  
                title: 'Aos Vivos',
                genre: 'MPB',
                coverPic: "coverPic.png",
                artistId: 1,
                released_at: new Date
            },
            {
                id_Album: 1,  
                title: 'CAJU',
                genre: 'MPB',
                coverPic: "coverPic.png",
                artistId: 2,
                released_at: new Date
            }
        ];

        prismaMock.album.findMany.mockResolvedValue(albums);

        await expect(AlbumService.getAlbums()).resolves.toEqual(albums);

        expect(prismaMock.album.findMany).toHaveBeenCalledWith({ orderBy: { title: 'asc' } });

    });

});

describe('getAlbumById', () => {

    const requestedId = 1;

    test('tenta acessar usuário inexistente ==> gera erro', async () => {
        
        prismaMock.user.findFirst.mockResolvedValue(null);

        await expect(AlbumService.deleteAlbum(requestedId)).rejects.toThrow(
            new QueryError("Não existe um usuário com esse id!")
        ); // testa a exceção QueryError é lançada quando albumById é null

        expect(prismaMock.album.findUnique).toHaveBeenCalledWith({
            where: { id_Album : requestedId }
        }); // testa se o findUnique é chamado com o parâmetro where: { id_Album : requestedId }

    });

    test('Verifica se o serviço getAlbumById retorna o álbum correto com base no id solicitado', async () => {

        const album = {
            id_Album: 1,  
            title: 'Aos Vivos',
            genre: 'MPB',
            coverPic: "coverPic.png",
            artistId: 1,
            released_at: new Date
        };

        prismaMock.album.findUnique.mockResolvedValue(album);

        await expect(AlbumService.getAlbumById(requestedId)).resolves.toEqual(album);

    });

});

describe('updateAlbum', () => {

    const requestedId = 1;

    const body = {
        id_Album: 1,  
        title: 'CAJU',
        genre: 'MPB',
        coverPic: "coverPic.png",
        artistId: 2,
        released_at: new Date
    };

    test('tenta acessar usuário inexistente ==> gera erro', async () => {
        
        prismaMock.user.findFirst.mockResolvedValue(null);

        await expect(AlbumService.updateAlbum(requestedId, body)).rejects.toThrow(
            new QueryError("Não existe um usuário com esse id!")
        ); // testa a exceção QueryError é lançada quando albumById é null

        expect(prismaMock.album.update).toHaveBeenCalledWith({
            where: { id_Album : requestedId },
            data: body
        }); // testa se o update é chamado com o parâmetro where: { id_Album : requestedId }

    });

    test('Verifica se o serviço updateAlbum atualiza corretamente o álbum com o id solicitado', async () => {

        prismaMock.album.update.mockResolvedValue(body);

        await expect(AlbumService.updateAlbum(requestedId, body)).resolves.toEqual(body);

    });

});

describe('deleteAlbum', () => {

    const requestedId = 1;

    test('Verifica se o serviço deleteAlbum deleta corretamente o álbum com o id solicitado', async () => {

        const deletedAlbum = {
            id_Album: 1,  
            title: 'CAJU',
            genre: 'MPB',
            coverPic: "coverPic.png",
            artistId: 2,
            released_at: new Date
        }

        prismaMock.album.findUnique.mockResolvedValue(deletedAlbum);

        await expect(AlbumService.deleteAlbum(requestedId)).resolves.toEqual(undefined);

    });

    test('tenta acessar usuário inexistente ==> gera erro', async () => {
        
        prismaMock.user.findUnique.mockResolvedValue(null);

        await expect(AlbumService.deleteAlbum(requestedId)).rejects.toThrow(
            new QueryError("Não existe um usuário com esse id!")
        ); // testa a exceção QueryError é lançada quando albumById é null

        expect(prismaMock.album.findUnique).toHaveBeenCalledWith({
            where: { id_Album : requestedId }
        }); // testa se o update é chamado com o parâmetro where: { id_Album : requestedId }

        expect(prismaMock.album.delete).not.toHaveBeenCalled(); // como user é null, album.delete nunca é chamado

    });
;
});

