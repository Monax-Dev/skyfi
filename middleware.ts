import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/' || path === '/register'
  const token = request.cookies.get('token')?.value || ''
  
  if(isPublicPath && token) {
    return NextResponse.redirect( new URL('/dashboard', request.nextUrl))
  }
  if(!isPublicPath && !token) {
    return NextResponse.redirect( new URL('/', request.nextUrl))
 }
}

export const config = {
  matcher: [
    '/',
    '/register',
    '/dashboard'
  ]
}