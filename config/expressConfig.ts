import cors, { CorsOptions } from "cors";
import express, { Express } from "express";
import dotenv from "dotenv";
import UserRouter from "../src/domains/User/controller/UserController";
import MusicRouter from "../src/domains/Music/controller/MusicController";
import AlbumRouter from "../src/domains/Album/controller/AlbumController";
import ArtistRouter from "../src/domains/Artist/controller/ArtistController";
import cookieParser from "cookie-parser";

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
  credentials: true,
  origin: process.env.APP_URL,
};

app.use(cors(options));
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use("/api/users", UserRouter);
app.use("/api/musics", MusicRouter);
app.use("/api/albums", AlbumRouter);
app.use("/api/artists", ArtistRouter);
