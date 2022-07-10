import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {fauna} from '../../../services/fauna'
import {query as q} from 'faunadb'
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user: any,account: any,profile: any): Promise<any>{
      const {email} = user.user

      try{
      await fauna.query(
        q.Create(
          q.Collection('users'),
          {
            data: {email}    
          }
        )
      )
      return true
    }catch(e){
      return false
    }
    }}
})