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
    async signIn(params){
      const {email} = params.user
      const userEmail = params.user.email ? params.user.email : ""
      try{
      const query = await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(userEmail)
              )
            )
          ),
          q.Create(
            q.Collection('users'),
            {
              data: {email},
            }
          ),
          q.Get(
            q.Match(
              q.Index('user_by_email'),
              q.Casefold(userEmail)
            )
          )
        )
      )
      console.log(query)
      return true
    }catch(e){
      return true
    }
    }}
})