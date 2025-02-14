import UserService from "./UserService";
import MusicService from "../../Music/services/MusicService";
import { prismaMock } from "../../../../config/singleton";
import bcrypt from "bcrypt";
import { compare } from "bcrypt";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { QueryError } from "../../../../errors/QueryError";
import { NotAuthorizedError } from "../../../../errors/NotAuthorizedError";

describe('changePassword', () => {

});

describe('createUser', () => {

    test('', async () => {

    });

});

describe('getUsers', () => {

});

describe('getUserById', () => {

    test('tenta acessar usuário inexistente ==> gera erro', async () => {
        
        prismaMock.user.findFirst.mockResolvedValue(null);

        const requestedId = 1;

        await expect(UserService.deleteUser(requestedId)).rejects.toThrow(
            new QueryError("Não existe um usuário com esse id!")
        ); // testa a exceção QueryError é lançada quando userById é null

        expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
            where: { id_User : requestedId }
        }); // testa se o findUnique é chamado com o parâmetro where: { id_User : requestedId }

    })

});

describe('updateUser', () => {

});

describe('deleteUser', () => {

    const requestedId = 1;

    test('tenta deletar usuário inexistente ==> gera erro', async () => {

        prismaMock.user.findFirst.mockResolvedValue(null);

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