'use server';

import { currentUser } from "@clerk/nextjs/server";
import jwt from "jsonwebtoken";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not logged in");
  if (!apiKey) throw new Error("Missing Stream API key");
  if (!apiSecret) throw new Error("Missing Stream API secret");

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // valid for 1 hour

  const token = jwt.sign(
    {
      user_id: user.id,
      iat,
      exp,
    },
    apiSecret,
    { algorithm: "HS256" }
  );

  return token;
};
