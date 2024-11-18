// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"

// const prisma = new PrismaClient()

// const handler = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID || "",
//       clientSecret: process.env.GITHUB_SECRET || "",
//       profile(profile) {
//         return {
//           id: profile.id.toString(),
//           name: profile.name || profile.login,
//           email: profile.email,
//           image: profile.avatar_url,
//           role: profile.login === process.env.ADMIN_GITHUB_USERNAME ? "admin" : "user",
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       // Only allow sign in if the GitHub username matches the admin username
//       return profile?.login === process.env.ADMIN_GITHUB_USERNAME
//     },
//     async session({ session, user }) {
//       if (session?.user) {
//         session.user.role = user.role
//       }
//       return session
//     },
//   },
//   pages: {
//     signIn: '/admin/login',
//     error: '/admin/login',
//   },
// })

// export { handler as GET, handler as POST }