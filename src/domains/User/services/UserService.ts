import prisma from "../../../../database/prismaClient";
import { User } from "@prisma/client";
import MusicService from "../../Music/services/MusicService";
import bcrypt from "bcrypt";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { QueryError } from "../../../../errors/QueryError";
import { NotAuthorizedError } from "../../../../errors/NotAuthorizedError";

class UserService {

  static async encryptPassword(password: string){
    const saltRounds = 10;
    const encrypted = await bcrypt.hash(password, saltRounds);
    return encrypted;
  }
  static async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id_User: userId },
      });
    if (!user) {
      throw new QueryError("Usuário não encontrado!");
      } 
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new NotAuthorizedError("Senha atual incorreta!");
      } 
      const encryptedPassword = await this.encryptPassword(newPassword);
        await prisma.user.update({
        where: { id_User: userId },
        data: { password: encryptedPassword },
      });
    }

  static async createUser(body: User) {
    if (body.email == null) {
      throw new InvalidParamError("Email não foi informado!");
    } else {
      const checkUser = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      })
  
      if (checkUser) {
        throw new QueryError("Esse email já está cadastrado!");
      }
    }
    
    if (body.password == null) {
      throw new InvalidParamError("Senha não foi informada!");
    } else {
      body.password = await this.encryptPassword(body.password);
    }

    if (body.username == null) {
      throw new InvalidParamError("Nome de usuário não foi informado!")
    }

    const user = {
      username: body.username,
      email: body.email,
      password: body.password,
      profilePic: body.profilePic,
      admin: body.admin
    } as User;

    await prisma.user.create({ data: user });
    return user;
  }


  static async getUsers() {
    const users = await prisma.user.findMany({ orderBy: { username: "asc" } });
    return users;
  }

  static async getUserById(requestedId: number) {
    const userById = await prisma.user.findUnique({
      where: { id_User: requestedId },
    });
    return userById;
  }

  static async updateUser(requestedId: number, body: User) {
    if (body.email == null) {
      throw new InvalidParamError("Email não foi informado!");
    } else {
      const checkUser = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      })
      
      if (body.email != checkUser?.email) {
        throw new NotAuthorizedError("Não é possível trocar o email!");
      }
    }
    
    if (body.password == null) {
      throw new InvalidParamError("Senha não foi informada!");
    }
    
    if (body.username == null) {
      throw new InvalidParamError("Nome de usuário não foi informado!")
    }
    
    if (requestedId) {
      const updateUser = await prisma.user.update({
        data: {
          username: body.username,
          email: body.email,
          password: body.password,
          profilePic: body.profilePic,
          admin: body.admin
        } as User,
        where: {
          id_User: requestedId,
        }
      });
      
      return updateUser;
    }

  }

  static async deleteUser(requestedId: number) {
    await prisma.user.delete({ where: { id_User: requestedId } });
  }

  static async listenToMusic(musicsId: number, usersId: number) {
    const musicById = await MusicService.getMusicById(musicsId);
    if (!musicById) {
      throw new QueryError("Não existe uma música com esse id!")
    } else if (usersId) {
      await prisma.user.update({
        where: {
          id_User: usersId
        },
        data: {
          MusicsOnUsers: {
            connect: {
              musicId: musicsId
            }
          }
        }
      })
    }

  }

  static async unlistenToMusic(musicsId: number, usersId: number) {
    const musicById = await MusicService.getMusicById(musicsId);
    if (!musicById) {
      throw new QueryError("Não existe uma música com esse id!")
    } else if (usersId) {
      await prisma.user.update({
        where: {
          id_User: usersId
        },
        data: {
          MusicsOnUsers: {
            disconnect: {
              musicId: musicsId
            }
          }
        }
      })
    }
  }
}

export default UserService;
