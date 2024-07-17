import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // Permite la solicitud si se cumple lo siguiente...
  // 1) Es una solicitud para autenticación de next-auth y proveedores
  // 2) El token existe
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirige al usuario al inicio de sesión si no tiene token Y está solicitando la ruta de login
  if (!token && pathname === '/auth/login') {
    return NextResponse.redirect('/auth/login');
  }

  // Si no es una solicitud de autenticación y no tiene token, redirige al inicio de sesión
  if (!token) {
    return NextResponse.redirect('/auth/login');
  }
}

export default middleware;  