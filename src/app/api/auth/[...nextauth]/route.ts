import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Senha', type: 'password'}
            },
            async authorize(credentials, req) {
                const response = await fetch('http://localhost:3000/session', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'Application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                })
                const user = await response.json();

                if(user && response.ok) {
                    return user
                }
                return null
            },
        })
    ],
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        async jwt({token, user}: any) {
            user && (token.user = user)
            return token
        },
        async session({session, token}: any) {
            session = token.user
            return session
        }
    }
}
const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }