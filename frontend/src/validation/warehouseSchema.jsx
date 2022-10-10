import * as yup from "yup";

export const warehouseSchema = yup.object({
    capacity: yup.number().integer().positive().required()
})