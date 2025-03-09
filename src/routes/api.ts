import { Request, Response } from "express";
import RouteGroup from "express-route-grouping";

const root = new RouteGroup();

root.group("/", (route) => {
  route.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
  });
});

export default root;
