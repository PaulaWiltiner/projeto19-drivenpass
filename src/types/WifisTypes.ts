import {wifis} from "@prisma/client"

export type TWifis= Omit<wifis,'id'>;