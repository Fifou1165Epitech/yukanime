import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [ 
        usernameClient()
    ]
})

export const { signIn, signUp, signOut, deleteUser, useSession, isUsernameAvailable } = authClient