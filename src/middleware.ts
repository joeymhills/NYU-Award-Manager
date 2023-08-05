import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client/edge';
import { AsyncLocalStorage } from 'node:async_hooks';
import { WaitGroup } from "@jpwilliams/waitgroup";
interface storage {
  globalRole:string
}
const prisma = new PrismaClient()
const storage = new AsyncLocalStorage

var wg = new WaitGroup;

export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up"],
  
  afterAuth(auth, req, evt) {
    // (() => {
    //   if(req.nextUrl.pathname !== ("/unauthorized")) {
    //   return NextResponse.redirect(new URL('/unauthorized', process.env.NEXT_PUBLIC_BASE_URL))}
    // })()

  const user = auth.user
  const body = {username: user?.username, userId: auth.userId};
  const userId = auth.userId
  const username = user?.username
  
  if (!auth.userId && !auth.isPublicRoute) {
    const newUrl = new URL('/sign-in', `${process.env.NEXT_PUBLIC_BASE_URL}`)
    return NextResponse.redirect(newUrl)
  }
//   async function main() {
    
//     const handler = async () => {
//       wg.add();
//       try {
//         const users = await prisma.users.findUnique({
//             where: {
//               userId: userId
//             },
//           })

//         if (users == null) {
//             await prisma.users.create({
//                 data: {
//                   userId: userId,
//                   role: 'unassigned',
//                   name: username
//                 },
//               })
//             const user = await prisma.users.findUnique({
//                 where: {
//                 userId: userId
//             },
//         })
//           let globalRole = user.role
//       }
//         else {
//           let globalRole = users.role
//       }
//     }
//     catch (error) {
//     console.log('error with prisma middleware')
// }
//   console.log(globalRole)
// }

// handler();
// await wg.wait();
// const store = storage.getStore();
// console.log(store)

// while (store == "undefined") {
//   let store = storage.getStore();
//   console.log(store)
// }

  if(req.nextUrl.pathname == "/admin") {
    const orgSelection = new URL('/', process.env.NEXT_PUBLIC_BASE_URL)
    return NextResponse.redirect(orgSelection)}
  
  const authorize = async () => {
    try{
    const response = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/roleCheck`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
      }).then(res => res.json())
      
      .then(res => {return res.users.role})
      
      .then(res => {
      storage.enterWith({
        res
      })
      if((res == 'manager' || 'user' || 'unassigned') && req.nextUrl.pathname == "/admin") {
        const orgSelection = new URL('/', process.env.NEXT_PUBLIC_BASE_URL)
        return NextResponse.redirect(orgSelection)}
      })
    }
    catch(error) {
      console.log('error in middleware role check')
    }
    console.log(storage.getStore())
  }
    authorize();

  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)","/","/(api|trpc)(.*)"],
};