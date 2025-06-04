import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import passport from "./config/passport";
import verifyAccountRouter from "./routes/verifyAccount";
import doctorRoutes from "./routes/doctorRoutes";
import appointmentsRoutes from "./routes/appointments";

import forgotPasswordRouter from "./routes/forgotPassword";
import resetPasswordRouter from "./routes/resetPassword";

import "./config/passport";

import { typeDefs, resolvers } from "./graphql";
import { ExpressContextFunctionArgument } from '@apollo/server/express4';
import { verifyAccountHandler } from "./modules/user/controllers/verifyAccountHandler";

interface MyContext {
  user: any;
}

async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("✅ Connected to MongoDB");

  const app = express();
  const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(bodyParser.json());
  app.use(passport.initialize());

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }:ExpressContextFunctionArgument): Promise<MyContext> => {
        const user = await new Promise<any>((resolve) => {
          passport.authenticate(
            "jwt",
            { session: false },
            (_err: any, user: any) => {
              resolve(user );
            }
          )(req);
        });
        return { user };
      },
    })
  );

  app.use("/", verifyAccountRouter);
  app.use("/", forgotPasswordRouter);
  app.use("/", resetPasswordRouter);

  app.use("/doctors", doctorRoutes);
  app.use("/appointments", appointmentsRoutes);

  app.get("/verify-account", verifyAccountHandler);

  app.get("/", (_req, res) => {
    res.send("🚀 Server is running! Visit /graphql");
  });

  const port = process.env.PORT || 3333;
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

startServer();
