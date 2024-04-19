import { OrderItem, Item, Order, PrismaClient } from "@prisma/client";

const controller = ({ db, logger }: System) => {

    return {
    };
};

declare global {
    type BirthController = ReturnType<typeof controller>;
}

export default controller;
