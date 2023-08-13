import prisma from "../../../../../prisma/client"

export async function GET(request: Request) {
  console.log(request.url)
  const userList = await prisma.user.findMany({
    where: {
      role: 'admin'
    },
    })
  return new Response(JSON.stringify({userList}))
}