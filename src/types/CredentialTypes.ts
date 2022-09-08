import {credentials} from "@prisma/client"

export type TCredentials= Omit<credentials,'id'>;