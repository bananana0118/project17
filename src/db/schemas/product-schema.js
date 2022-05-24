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
    description: {
      type: String,
      required: false,
    },
    categories: {
      type: String,
      required: true,
    },
}
);

export { PorducSchema };
