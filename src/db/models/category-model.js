import { model } from "mongoose";
import { CateogrySchema } from "../schemas/category-schema";

const Cateogry = model("categories", CateogrySchema);

export class CategoryModel {}
const categoryModel = new CategoryModel();

export { categoryModel };
