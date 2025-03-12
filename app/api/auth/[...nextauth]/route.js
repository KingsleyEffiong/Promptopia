import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Session Callback (called when session is created)
    async session({ session }) {
      console.log("Session callback fired", session);
      try {
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString(); // Add user ID to session
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error.message);
        return session; // Returning session even if error occurs
      }
    },
    // SignIn Callback (called when user signs in)
    async signIn({ profile }) {
      console.log("User is signing in", profile);
      try {
        await connectToDB(); // Ensure DB connection
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          console.log("Creating new user");
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", ""),
            image: profile.picture,
          });
        }
        return true; // Sign-in successful
      } catch (error) {
        console.error("Sign-in error:", error.message);
        return false; // If error occurs, prevent sign-in
      }
    },
  },
});

export { handler as GET, handler as POST };
