import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
) => {
  app.get("/", async (req, res) => {
    return [];
  });

  app.post("/", async (req, res) => {
    return "hello world users post";
  });

  app.get("/list", async (req, res) => {
    return "hello world list";
  });

  done();
};
