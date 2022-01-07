import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

// Auth Config
export const ACCESS_TOKEN_EXPIRE_TIME = "15m";
export const REFRESH_TOKEN_EXPIRE_TIME = "7d";

export const SERVER_PORT = 4000;