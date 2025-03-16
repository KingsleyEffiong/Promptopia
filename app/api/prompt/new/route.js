import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  try {
    await connectToDB();
    console.log("Connected to DB ✅");

    const body = await req.json();
    console.log("Received data:", body); // ✅ Debug log

    const { userId, prompt, tag } = body;

    if (!userId || !prompt || !tag) {
      return new Response("Missing required fields", { status: 400 }); // ✅ Prevent empty data
    }

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error("Error creating prompt:", error); // ✅ Log error details
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
