import prisma from "../../../../database/prismaClient";
import { User } from "@prisma/client";

class UserService {
  async create(body: User) {
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
}

export default new UserService();
