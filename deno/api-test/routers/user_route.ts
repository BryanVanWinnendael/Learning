import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  deleteAllUsers,
} from "../model/users.ts"

export async function userRoute(req: Request, id?: string) {
  if (id) {
    // Handle "/users/:id"
    if (req.method === "GET") {
      const user = getUser(id)
      return new Response(JSON.stringify(user), { status: 200 })
    } else if (req.method === "PUT") {
      try {
        const { name } = await req.json()
        const success = updateUser(id, name)
        if (!success) {
          return new Response("User not found", { status: 404 })
        }
        return new Response("User updated", { status: 200 })
      } catch (_error) {
        return new Response("Invalid request", { status: 400 })
      }
    } else if (req.method === "DELETE") {
      const success = deleteUser(id)
      if (!success) {
        return new Response("User not found", { status: 404 })
      }
      return new Response("User deleted", { status: 200 })
    }
  } else {
    // Handle "/users"
    if (req.method === "GET") {
      const users = getUsers()
      return new Response(JSON.stringify(users), { status: 200 })
    } else if (req.method === "POST") {
      try {
        const { name } = await req.json()
        const success = createUser(name)
        if (!success) {
          return new Response("User not created", { status: 500 })
        }
        return new Response("User created", { status: 201 })
      } catch (_error) {
        return new Response("Invalid request", { status: 400 })
      }
    } else if (req.method === "DELETE") {
      const succes = deleteAllUsers()
      if (!succes) {
        return new Response("Users not deleted", { status: 404 })
      }
      return new Response("All users deleted", { status: 200 })
    }
  }

  return new Response("Method not allowed", { status: 405 })
}
