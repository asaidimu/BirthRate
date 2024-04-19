import { z } from "zod";
export const LoginCredentials = z
    .object({
    username: z.string().min(2),
    password: z.string().min(8),
})
    .strict();
export const NewUserData = z
    .object({
    fullName: z.string(),
    email: z.string(),
    username: z.string().min(2),
    password: z.string().min(8),
})
    .strict();
export const UserID = z
    .object({
    id: z.number(),
})
    .strict();
export const UserUpdate = z
    .object({
    fullName: z.string(),
    email: z.string(),
    username: z.string().min(2),
    password: z.string().min(8),
})
    .strict()
    .partial();
export const InventoryItemData = z
    .object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    image: z.string(),
    available: z.number().or(z.string()),
})
    .partial({
    image: true,
})
    .strict();
export const NewMenuItem = z.object({ items: z.union([InventoryItemData, InventoryItemData.array()]) });
export const InventoryItemUpdate = z
    .object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number().or(z.string()),
    image: z.string(),
    available: z.number().or(z.string()),
})
    .strict()
    .partial({
    name: true,
    description: true,
    price: true,
    image: true,
    available: true,
});
const newOrder = z.object({
    id: z.number(),
    quantity: z.number()
}).strict();
export const NewOrder = z.object({
    items: newOrder.array()
});
export const UpdateOrderStatus = z.object({
    id: z.number(),
    status: z.literal("complete").or(z.literal("pending")).or(z.literal("cancelled"))
});
export const DeleteItem = z.object({
    id: z.number().or(z.number().array())
});
export const NewCartItem = z.object({
    item: z.object({
        id: z.number(),
        quantity: z.number().min(1),
    }).strict()
}).strict();
//# sourceMappingURL=index.js.map