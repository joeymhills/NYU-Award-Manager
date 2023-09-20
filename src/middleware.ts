export { default } from 'next-auth/middleware'

export const config = {
  matcher: [ '/app','/detailPage','/editAward','/adminDetailPage', '/admin','/admin2', '/addAward', '/', '/unauthorized', ]
}
