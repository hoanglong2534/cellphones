import express from 'express'
import {
  getAllProduct,
  filterProductByType,
  findProductById,
  AddProduct,
  DeleteProduct,
  CommentProduct,
  UpdateProduct,
  SearchProduct,
  paginationProduct,
  RateProduct,
  RepCommentProduct,
  BlogProduct,
  PinCommentProduct,
  UploadModel,
  filterProductByRandomField,
} from "../controllers/ProductController.js";
import { isAuth, isAdmin } from "../untils/until.js";
import { upload, uploadModel } from "../untils/until.js";

const ProductRouter = express.Router();

ProductRouter.get("/:type", filterProductByType);
ProductRouter.post("/filter/random", filterProductByRandomField);
ProductRouter.get("/detail/:id", findProductById);
ProductRouter.get("/", getAllProduct);
ProductRouter.get(`/pagination/:page`, paginationProduct);

ProductRouter.post("/rate/:id", RateProduct);
ProductRouter.post("/comment/:id", CommentProduct);
ProductRouter.post("/pin/comment/:id", PinCommentProduct);
ProductRouter.post("/rep/comment/:id", RepCommentProduct);

ProductRouter.post(
  "/create",
  // isAuth,
  // isAdmin,
  upload.single("image"),
  AddProduct
);
ProductRouter.put(
  "/update",
  // isAuth,
  // isAdmin,
  upload.single("image"),
  UpdateProduct
);
ProductRouter.post(
  "/blog/:id",
  // isAuth,
  // isAdmin,
  BlogProduct
);
ProductRouter.delete(
  "/delete/:id",
  // isAuth,
  // isAdmin,
  upload.single("image"),
  DeleteProduct
);

// Upload a 3D model (gltf / glb) and attach to product.modelUrl
ProductRouter.post(
  "/upload-model/:id",
  // isAuth,
  // isAdmin,
  uploadModel.single("model"),
  UploadModel
);

ProductRouter.get('/search/product', SearchProduct)

export default ProductRouter