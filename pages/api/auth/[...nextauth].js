import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({

    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET
      }),
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: {
              label: "Email",
              type: "text",
              placeholder: "abc@example.com",
            },
            password: {
              label: "Password",
              type: "password",
            },
          },
          async authorize(credentials, req) {
            const { email, password } = credentials;

            const res = await fetch("http://localhost:3000/api/users/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            });
    
            const user = await res.json();
    
            if (res.ok && user) {
              return user;
            } else return null;
          },
        }),
    ],

    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token, user }) {
        session.user = token;
  
        return session;
      },
    },
  
    pages: {
      signIn: "/auth/signin",
    },
})