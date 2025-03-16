import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });a
  } catch (error) {
    console.log(error);
    return new Response("Falied to fetch all prompts", { status: 500 });
  }
};
