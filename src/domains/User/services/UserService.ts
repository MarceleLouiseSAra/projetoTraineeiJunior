import prisma from "../../../../database/prismaClient";
import { User } from "@prisma/client";
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

  static async createUser(admin: boolean, body: User) {
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

    if (!admin && body.admin) {
      throw new NotAuthorizedError("Somente administradores podem designar outros administradores!");
    } else if(!admin) {
      body.admin = false;
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
    } else {
      // const encryptedPassword = await this.encryptPassword(body.password);
      // if(body.password != encryptedPassword){
      //   console.log(encryptedPassword)
      //   throw new InvalidParamError("Email, senha ou nome de usuário incorreto(s)!");
      // }
    }

    if (body.username == null) {
      throw new InvalidParamError("Nome de usuário não foi informado!")
    }

    body.admin = false;

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

  static async deleteUser(requestedId: number) {
    await prisma.user.delete({ where: { id_User: requestedId } });
  }
}

export default UserService;
