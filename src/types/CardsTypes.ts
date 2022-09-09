import {cards} from "@prisma/client"

export type TCards= Omit<cards ,'id'>;
