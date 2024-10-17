import { assert } from "jsr:@std/assert"
import { getUser, createUser, deleteUser, updateUser } from "../model/users.ts"

Deno.test(function createUserTest() {
  const userCreated = createUser("createUserTest")
  assert(userCreated)
})

Deno.test(function getUserTest() {
  const userCreated = createUser("getUserTest")
  assert(userCreated)

  const user = getUser(String(userCreated.id))
  assert(typeof user.id === "number")
})

Deno.test(function deleteUserTest() {
  const userCreated = createUser("deleteUserTest")
  assert(userCreated)

  const userCreated2 = createUser("deleteUserTest2")
  assert(userCreated2)

  const userIdToDelete = String(userCreated.id)

  const successDelete = deleteUser(userIdToDelete)
  assert(successDelete)

  const user = getUser(userIdToDelete)
  assert(user === undefined)
})

Deno.test(function updateUserTest() {
  const userCreated = createUser("updateUserTest")
  assert(userCreated)

  const userIdToUpdate = String(userCreated.id)
  const newName = "updateUserTest2"

  const successUpdate = updateUser(userIdToUpdate, newName)
  assert(successUpdate)

  const user = getUser(userIdToUpdate)
  assert(user.name === newName)
})
