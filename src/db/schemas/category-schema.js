import { Schema } from "mongoose";

const CateogrySchema = new Schema({
    productCategory: {
        type: String,
        required: true,
    },
});

export { CateogrySchema };
