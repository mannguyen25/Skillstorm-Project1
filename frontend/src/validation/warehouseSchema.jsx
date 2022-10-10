import * as yup from "yup";

export const warehouseSchema = yup.object({
    capacity: yup.number().integer().positive().required(),
    inventory: yup.array()
        .of(
            yup.object().shape({
                _id: yup.string().required(),
                qty: yup.number().integer().positive(),
              }).optional()
        )
})