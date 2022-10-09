import * as yup from "yup";

export const warehouseSchema = yup.object({
    capacity: yup.number().required(),
    inventory: yup.array()
        .of(
            yup.object().shape({
                item: yup.string(),
                qty: yup.number(),
              })
        )
})