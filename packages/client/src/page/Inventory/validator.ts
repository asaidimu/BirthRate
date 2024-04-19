import { z } from "zod";

export const InventoryItemData = z
  .object({
    id: z.number().or(z.string()),
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number(),
    image: z.string(),
    available: z.number(),
  })
  .strict()
  .partial({
    id: true,
    image: true
});
