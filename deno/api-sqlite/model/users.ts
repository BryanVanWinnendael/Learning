import { db } from "../db/db.ts"

type User = {
  id: number
  name: string
}

export function getUsers() {
  const users = db.prepare("SELECT * FROM users").all() as User[]
  return users
}

export function getUser(id: string) {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User
  return user
}

export function createUser(name: string): User | false {
  try {
    db.prepare("INSERT INTO users (name) VALUES (?)").run(name)
    const user = db
      .prepare("SELECT * FROM users WHERE name = ?")
      .get(name) as User
    return user
  } catch (_error) {
    return false
  }
}

export function updateUser(id: string, name: string): User | false {
  try {
    db.prepare("UPDATE users SET name = ? WHERE id = ?").run(name, id)
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User
    return user
  } catch (_error) {
    return false
  }
}

export function deleteUser(id: string) {
  try {
    db.prepare("DELETE FROM users WHERE id = ?").run(id)
    return true
  } catch (_error) {
    return false
  }
}

export function deleteAllUsers() {
  try {
    db.prepare("DELETE FROM users").run()
    return true
  } catch (_error) {
    return false
  }
}
