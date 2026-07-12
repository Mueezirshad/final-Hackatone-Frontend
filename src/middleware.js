import { NextResponse } from 'next/server';

// 1. Function ka naam exact 'middleware' hona chahiye
export function middleware(request) {
  // Aapka middleware ka logic yahan aayega
  return NextResponse.next();
}

// 2. Ya phir aap default export bhi kar sakte hain:
// export default function middleware(request) { ... }