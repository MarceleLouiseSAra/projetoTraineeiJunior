import UserService from "./src/domains/User/services/UserService";

async function main() {
  const body = {
    id_User: 0,
    username: "Sally",
    email: "louise20marcele03@gmail.com",
    password: "tch4birau",
    premium: false,
    profilePic: null,
    created_at: new Date(),
  };

  const user = await UserService.create(body);

  console.log(user);
}

main();
