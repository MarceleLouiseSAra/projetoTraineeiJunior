import prisma from "../../../../database/prismaClient";
import { User } from "@prisma/client";

class UserService {
  static async createUser(body: User) {
    const user = {
      username: body.username,
      email: body.email,
      password: body.password,
      premium: body.premium,
      profilePic: body.profilePic,
    } as User;

    await prisma.user.create({ data: user });
    return user;
  }

  static async getUsers() {
    const users = await prisma.user.findMany({ orderBy: { username: "asc" } });
    return users;
  }

  static async getUserById(requestedId: number) {
    const user = await prisma.user.findFirst({
      where: { id_User: requestedId },
    });
    return user;
  }

  static async updateUser(requestedId: number, body: User) {
    const updateUser = await prisma.user.update({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
        premium: body.premium,
        profilePic: body.profilePic,
      },
      where: {
        id_User: requestedId,
      },
    });

    return updateUser;
  }

  static async deleteUser(requestedId: number) {
    await prisma.user.delete({ where: { id_User: requestedId } });
  }
}

export default UserService;
