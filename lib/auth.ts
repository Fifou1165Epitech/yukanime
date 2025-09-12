import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/app/generated/prisma";
import { admin } from "better-auth/plugins"
import { username } from "better-auth/plugins"

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true, 
    },
    user: {
        deleteUser: {
            enabled: true,
        }
    },
    plugins: [
        username(),
        admin()
    ],
    databaseHooks: {
        user: {
            create: {
                before: async (user, context) => {
                    if (user.username !== user.name) {
                        user.username = user.name;
                    }
                    return {
                        data: user
                    };
                }
            }
        }
    }

});