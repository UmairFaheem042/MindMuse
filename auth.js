import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const { id, login, bio } = profile;
      const { name, email, image } = user;

      try {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id,
            name,
            username: login,
            email,
            image,
            bio: bio || "",
          });
        }
        return true; // Continue with sign-in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Halt sign-in if there's an error
      }
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });
          token.id = user?._id || null;
        } catch (error) {
          console.error("Error in jwt callback:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      // session.user.id = token.id; // Add user ID to session
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
