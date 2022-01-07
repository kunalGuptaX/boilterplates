import { Request, Response } from "express";

export const indexRoute = (_req: Request, res: Response) => {
    res.send("hello");
  }