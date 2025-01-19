import UserService from "../services/UserService";
import { User } from "@prisma/client";


class UserController {
  async function criarUser(body: User) {
    return await UserService.createUser(body);
  }
  
  async function getUsers() {
    return await UserService.getUsers();
  }
  
  async function getUserById(requestedId: number) {
    return await UserService.getUserById(requestedId);
  }
  
  async function atualizarUser(requestedId: number, body: User) {
    return await UserService.updateUser(requestedId, body);
  }
  
  async function deletarUser(requestedId: number) {
    await UserService.deleteUser(requestedId);
  }
}

export default UserController;