import UserController from "./src/domains/User/controller/UserController";
import MusicController from "./src/domains/Music/controller/MusicController";

async function main() {
  // const users = await getUsers();
  // console.log(users);
  // const userId7 = await getUserById(7);
  // console.log(userId7);
  // deletarUser(1);
  // deletarUser(2);
  // deletarUser(3);
  // deletarUser(4);
  // deletarUser(5);
  // deletarUser(6);
  // deletarUser(7);
  // deletarUser(8);
  // deletarUser(9);
  // deletarUser(10);
  // deletarUser(11);
  // deletarUser(12);
  // const User_body = {
  //   id_User: 0,
  //   username: "Sally",
  //   email: "louise20marcele03@gmail.com",
  //   password: "tch4birau",
  //   premium: false,
  //   profilePic: null,
  //   created_at: new Date(),
  // };
  // const user = await criarUser(User_body);
  // console.log(user);
  // const Album_body = {
  //   id_Album: 0,
  //   title: "evermore",
  //   genre: "folk indie",
  //   coverPic: null,
  //   released_at: new Date(),
  //   artistId: 0,
  // };
  // const album = await AlbumService.createAlbum(Album_body);
  // console.log(album);


  // Teste para músicas
  /*
  const musicController = new MusicController();

    //Buscar todas as músicas
    console.log("\n Buscando todas as músicas...");
    const musicas = await musicController.getMusicas();
    console.log("Músicas encontradas:", musicas);

    //Buscar música específica pelo ID (teste com ID 1)
    console.log("\n Buscando música com ID 1...");
    const musicaById = await musicController.getMusicaPorId(1);
    console.log("Música encontrada:", musicaById);

    //Criar uma nova música (testando com dados fictícios)
    console.log("\n Criando uma nova música...");
    const musicBody = {
      id_Music: 0,
      title: "Nova Música Teste",
      genre: "Rock",
      coverPic: null,
      released_at: new Date(),
      albumId: 1, // Certificar-se de que esse álbum existe no banco
      artistId: 1, // Certificar-se de que esse artista existe no banco
    };
    const novaMusica = await musicController.criarMusica(musicBody);
    console.log("Música criada:", novaMusica);

    //Atualizar a música recém-criada
    console.log("\n Atualizando a música...");
    const updatedMusic = await musicController.atualizarMusica(
      novaMusica.id_Music,
      {
        id_Music: novaMusica.id_Music,
        title: "Nova Música Atualizada",
        genre: "Pop",
        coverPic: novaMusica.coverPic,
        released_at: novaMusica.released_at,
        albumId: novaMusica.albumId,
        artistId: novaMusica.artistId,
      }
    );
    console.log("Música atualizada:", updatedMusic);

    //Deletar a música recém-criada
    console.log("\n Deletando a música criada...");
    await musicController.deletarMusica(novaMusica.id_Music);
    console.log("Música deletada com sucesso!");
  }
  
  */
}

main();
