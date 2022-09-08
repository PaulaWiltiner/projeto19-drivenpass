import {users} from "@prisma/client"

export type TUsers = Omit<users,'id'>;