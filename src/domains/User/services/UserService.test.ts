import UserService from "./UserService";
import MusicService from "../../Music/services/MusicService";
import { prismaMock } from "../../../../config/singleton";
import bcrypt from "bcrypt";
import { QueryError } from "../../../../errors/QueryError";


describe('createUser', () => {

    test('Verifica se o serviço createUser cria corretamente um novo usuário com os dados fornecidos', async () => {

        const user = {
            id_User: 1,  
            username: 'Sally',
            email: 'louise20marcele03@gmail.com',
            password: "1234",
            admin: false,
            profilePic: "coverPic.png",
            created_at: new Date
        };

        prismaMock.user.create.mockResolvedValue(user);

        await expect(UserService.createUser(user)).resolves.toEqual({  
            username: 'Sally',
            email: 'louise20marcele03@gmail.com',
            password: "1234",
            admin: false,
            profilePic: "coverPic.png"
        })

    });

});

describe('getUsers', () => {

    test('Verifica se o serviço getUsers retorna um array de usuários corretamente', async () => {

        const users = [
            {
            id_User: 1,  
            username: 'Sally',
            email: 'louise20marcele03@gmail.com',
            password: "1234",
            admin: false,
            profilePic: "coverPic.png",
            created_at: new Date
            }
        ]

        prismaMock.user.findMany.mockResolvedValue(users);

        await expect(UserService.getUsers()).resolves.toEqual(users);

        expect(prismaMock.user.findMany).toHaveBeenCalledWith({ orderBy: { username: 'asc' } });

    });

});

describe('getUserById', () => {

    const requestedId = 1;

    test('Verifica se o serviço getUserById retorna o usuário correto com base no id solicitado', async () => {

        const user = {
            id_User: 1,  
            username: 'Sally',
            email: 'louise20marcele03@gmail.com',
            password: "1234",
            admin: false,
            profilePic: "coverPic.png",
            created_at: new Date
        };
        
        prismaMock.user.findUnique.mockResolvedValue(user);

        await expect(UserService.getUserById(requestedId)).resolves.toEqual(user);

    });

    test('tenta acessar usuário inexistente ==> gera erro', async () => {
        
        prismaMock.user.findFirst.mockResolvedValue(null);

        await expect(UserService.deleteUser(requestedId)).rejects.toThrow(
            new QueryError("Não existe um usuário com esse id!")
        ); // testa a exceção QueryError é lançada quando userById é null

        expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
            where: { id_User : requestedId }
        }); // testa se o findUnique é chamado com o parâmetro where: { id_User : requestedId }

    })

});

describe('updateUser', () => {

    const requestedId = 1;

    const body = {
        id_User: 1,  
        username: 'Sally',
        email: 'louise20marcele03@gmail.com',
        password: "1234",
        admin: false,
        profilePic: "coverPic.png",
        created_at: new Date
    };

    test('tenta acessar usuário inexistente ==> gera erro', async () => {
        
        prismaMock.user.findFirst.mockResolvedValue(null);

        await expect(UserService.updateUser(requestedId, body)).rejects.toThrow(
            new QueryError("Não existe um usuário com esse id!")
        ); // testa a exceção QueryError é lançada quando albumById é null

        expect(prismaMock.album.update).toHaveBeenCalledWith({
            where: { id_Album : requestedId },
            data: body
        }); // testa se o update é chamado com o parâmetro where: { id_Album : requestedId }

    });

    test('Verifica se o serviço updateUser atualiza corretamente o usuário com o id solicitado', async () => {

        prismaMock.user.update.mockResolvedValue(body);

        await expect(UserService.updateUser(requestedId, body)).resolves.toEqual(body);

    });

});

describe('deleteUser', () => {

    const requestedId = 1;

    test('Verifica se o serviço deleteCretae deleta corretamente o usuário com o id solicitado', async () => {

        const deletedUser = {
            id_User: 1,  
            username: 'Sally',
            email: 'louise20marcele03@gmail.com',
            password: "1234",
            admin: false,
            profilePic: "coverPic.png",
            created_at: new Date
        }

        prismaMock.user.findUnique.mockResolvedValue(deletedUser);

        await expect(UserService.deleteUser(requestedId)).resolves.toEqual(undefined);

    });

    test('tenta deletar usuário inexistente ==> gera erro', async () => {

        prismaMock.user.findUnique.mockResolvedValue(null);

        await expect(UserService.deleteUser(requestedId)).rejects.toThrow(
            new QueryError("Não existe um usuário com esse id!")
        ); // testa a exceção QueryError é lançada quando userById é null

        expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
            where: { id_User : requestedId }
        }); // testa se o findUnique é chamado com o parâmetro where: { id_User : requestedId } em getUserById

        expect(prismaMock.user.delete).not.toHaveBeenCalled(); // como user é null, user.delete nunca é chamado

    })

});

describe('listenToMusic', () => {

    test('tenta acessar uma música inexistente ==> gera erro', async () => {

        prismaMock.music.findUnique.mockResolvedValue(null);

        const requestedId = 1;

        await expect(MusicService.getMusicById(requestedId)).rejects.toThrow(
            new QueryError("Não existe uma música com esse id!")
        ); // testa a exceção QueryError é lançada quando musicById é null

        expect(prismaMock.user.update).not.toHaveBeenCalled(); // caso a música não exista, user.update não deve ser chamado

    });

    test('', async () => {

    })

});

describe('unlistenToMusic', () => {

    test('tenta acessar uma música inexistente ==> gera erro', async () => {

        prismaMock.music.findUnique.mockResolvedValue(null);

        const requestedId = 1;

        await expect(MusicService.getMusicById(requestedId)).rejects.toThrow(
            new QueryError("Não existe uma música com esse id!")
        ); // testa a exceção QueryError é lançada quando musicById é null

        expect(prismaMock.user.update).not.toHaveBeenCalled(); // caso a música não exista, user.update não deve ser chamado

    })

});