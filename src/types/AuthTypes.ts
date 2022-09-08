import {users} from "@prisma/client"
import {sessions} from "@prisma/client"

export type TUsers = Omit<users,'id'>;
export type TSessions= Omit<sessions,'id'>;