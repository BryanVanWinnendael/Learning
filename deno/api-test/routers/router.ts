import { userRoute } from "./user_route.ts"

// Define URLPattern globally to avoid recreating it on each function call
const USER_ROUTE = new URLPattern({ pathname: "/users/:id" })

export function router(req: Request) {
  const { pathname } = new URL(req.url)

  // Route for "/users"
  if (pathname === "/users") {
    return userRoute(req)
  }

  // Match route for "/users/:id"
  const match = USER_ROUTE.exec(req.url)
  if (match) {
    const id = match.pathname.groups.id
    return userRoute(req, id)
  }

  return new Response("Method not allowed", { status: 405 })
}
