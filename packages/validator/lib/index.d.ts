import { z, ZodType } from "zod";
export declare const LoginCredentials: ZodType;
export declare const NewUserData: ZodType;
export declare const UserID: ZodType;
export declare const UserUpdate: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    username?: string | undefined;
    password?: string | undefined;
    fullName?: string | undefined;
    email?: string | undefined;
}, {
    username?: string | undefined;
    password?: string | undefined;
    fullName?: string | undefined;
    email?: string | undefined;
}>;
export declare const InventoryItemData: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    image: z.ZodOptional<z.ZodString>;
    available: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
}, "strict", z.ZodTypeAny, {
    image?: string | undefined;
    name: string;
    description: string;
    price: number;
    available: string | number;
}, {
    image?: string | undefined;
    name: string;
    description: string;
    price: number;
    available: string | number;
}>;
export declare const NewMenuItem: z.ZodObject<{
    items: z.ZodUnion<[z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        price: z.ZodNumber;
        image: z.ZodOptional<z.ZodString>;
        available: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strict", z.ZodTypeAny, {
        image?: string | undefined;
        name: string;
        description: string;
        price: number;
        available: string | number;
    }, {
        image?: string | undefined;
        name: string;
        description: string;
        price: number;
        available: string | number;
    }>, z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        price: z.ZodNumber;
        image: z.ZodOptional<z.ZodString>;
        available: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strict", z.ZodTypeAny, {
        image?: string | undefined;
        name: string;
        description: string;
        price: number;
        available: string | number;
    }, {
        image?: string | undefined;
        name: string;
        description: string;
        price: number;
        available: string | number;
    }>, "many">]>;
}, "strip", z.ZodTypeAny, {
    items: {
        image?: string | undefined;
        name: string;
        description: string;
        price: number;
        available: string | number;
    } | {
        image?: string | undefined;
        name: string;
        description: string;
        price: number;
        available: string | number;
    }[];
}, {
    items: {
        image?: string | undefined;
        name: string;
        description: string;
        price: number;
        available: string | number;
    } | {
        image?: string | undefined;
        name: string;
        description: string;
        price: number;
        available: string | number;
    }[];
}>;
export declare const InventoryItemUpdate: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    image: z.ZodOptional<z.ZodString>;
    available: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    price?: string | number | undefined;
    image?: string | undefined;
    available?: string | number | undefined;
    id: number;
}, {
    name?: string | undefined;
    description?: string | undefined;
    price?: string | number | undefined;
    image?: string | undefined;
    available?: string | number | undefined;
    id: number;
}>;
export declare const NewOrder: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        quantity: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: number;
        quantity: number;
    }, {
        id: number;
        quantity: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        id: number;
        quantity: number;
    }[];
}, {
    items: {
        id: number;
        quantity: number;
    }[];
}>;
export declare const UpdateOrderStatus: z.ZodObject<{
    id: z.ZodNumber;
    status: z.ZodUnion<[z.ZodUnion<[z.ZodLiteral<"complete">, z.ZodLiteral<"pending">]>, z.ZodLiteral<"cancelled">]>;
}, "strip", z.ZodTypeAny, {
    status: "complete" | "pending" | "cancelled";
    id: number;
}, {
    status: "complete" | "pending" | "cancelled";
    id: number;
}>;
export declare const DeleteItem: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodArray<z.ZodNumber, "many">]>;
}, "strip", z.ZodTypeAny, {
    id: number | number[];
}, {
    id: number | number[];
}>;
export declare const NewCartItem: z.ZodObject<{
    item: z.ZodObject<{
        id: z.ZodNumber;
        quantity: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: number;
        quantity: number;
    }, {
        id: number;
        quantity: number;
    }>;
}, "strict", z.ZodTypeAny, {
    item: {
        id: number;
        quantity: number;
    };
}, {
    item: {
        id: number;
        quantity: number;
    };
}>;
