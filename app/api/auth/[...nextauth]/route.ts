import NextAuth from "next-auth"
import { nextOptions } from "./nextOptions"

const handler = NextAuth(nextOptions)

export { handler as GET, handler as POST }