
export async function GET() {

  const userList = await prisma.user.findMany({
    where: {
      role: 'admin'
    },
    })
  return new Response(JSON.stringify({userList}))
}