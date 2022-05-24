import { Schema } from 'mongoose';

const PorducSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    description: {
      type: String,
      required: false,
    },
    categories: {
      type: String,
      required: true,
    },
    manufacturer: {
        type: String,
        required: true,
      },
}
);

export { PorducSchema };
