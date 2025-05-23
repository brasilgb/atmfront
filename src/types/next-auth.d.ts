import NextAuth from "next-auth";
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            is_admin: string;
            roles: string;
            token: string;
            createdAt: string;
            organizationId: string;
            filial: string;
        }
    }
}