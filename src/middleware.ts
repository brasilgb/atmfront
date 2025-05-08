// export { default } from "next-auth/middleware";
// export const config = { matcher: ["/admin","/customer"] }
// middleware.js
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as any;
  const { pathname } = req.nextUrl;

  // Rotas públicas que qualquer um pode acessar
  if (pathname.startsWith('/auth/login') || pathname === '/') {
    return NextResponse.next();
  }

  // Se não houver token, redirecionar para a página de login
  if (!token) {
    const url = new URL('/auth/login', req.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Verificar a role para rotas de administrador
  if (pathname.startsWith('/admin') && token?.user?.user?.is_admin !== true) {
    return NextResponse.redirect(new URL('/customer', req.url));
  }

  // Verificar a role para rotas de cliente (opcional, dependendo da sua estrutura)
  if (pathname.startsWith('/customer') && token?.user?.user?.is_admin !== false) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // Se o token existir e a role for permitida, prosseguir
  return NextResponse.next();
}

// Especificar quais rotas este middleware deve proteger
export const config = {
  matcher: ['/admin/:path*', '/customer/:path*'],
};