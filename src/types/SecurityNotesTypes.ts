import {securityNotes} from "@prisma/client"

export type TSecurityNotes= Omit<securityNotes,'id'>;