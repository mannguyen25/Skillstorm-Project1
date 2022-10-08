import * as yup from "yup";

export const itemSchema = yup.object({
    name: yup.string().required('Item name is required.'),
    brand: yup.string().optional(),
    UPC: yup.string().required('UPC # is required.'),
    component: yup.string().optional(),
    cost: yup.number().min(0).optional(),
    imgUrl: yup.string().url().optional()
})