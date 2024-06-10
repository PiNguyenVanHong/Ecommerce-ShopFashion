import * as z from "zod";

export const FormSchema = z.object({
    name: z.string().min(1),
});

export const BillboardFormSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

export const CategoryFormSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1),
});

export const SizeFormSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
});

export const ColorFormSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/, {
        message: "String must be a valid hex code"
    }).max(7, {
        message: "Hex code doesn't over 7 character"
    }),
});

export const ProductFormSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
});