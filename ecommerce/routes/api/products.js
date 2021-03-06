const express = require("express");
const passport = require("passport");

const cacheResponse = require("../../utils/cacheResponse");
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require("../../utils/time");
const ProductService = require("../../services/products");

const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema
} = require("../../utils/schemas/products");

// JWT strategy
require("../../utils/auth/strategies/jwt");

function productsApi(app) {
  const router = express.Router();
  app.use("/api/products", router);

  const productService = new ProductService();

  router.get("/", async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

    const { tags } = req.query;

    try {
      // throw new Error('This is an error from the API.')
      const products = await productService.getProducts({ tags });

      res.status(200).json({
        data: products,
        message: "products listed"
      });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:productId", async (req, res, next) => {
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

    const { productId } = req.params;

    try {
      const product = await productService.getProduct({ productId });

      res.status(200).json({
        data: product,
        message: "product listed"
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    const { body: product } = req;

    try {
      /* createProductSchema.validate(product, { abortEarly: false })
        .then(validateProduct => {
          return productService.createProduct({ product });
        })
        .then(createdProduct => {
          res.status(201).json({
            data: createdProduct,
            message: "products retrieved"
          });
        })
        .catch(validationError => {
          const errorMessage = validationError.details.map(d => d.message);
  
          res.status(400).json({
            message: errorMessage
          });
        }); */

      const validateProduct = await createProductSchema.validate(product, {
        abortEarly: false
      });
      const createdProduct = await productService.createProduct({ product });

      res.status(201).json({
        data: createdProduct,
        message: "products retrieved"
      });
    } catch (error) {
      const errorMessage = error.details.map(d => d.message);

      res.status(400).json({
        message: errorMessage
      });
      // next(error);
    }
  });

  router.put(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const { productId } = req.params;
      const { body: product } = req;

      try {
        const updatedProduct = await productService.updateProduct({
          productId,
          product
        });

        res.status(200).json({
          data: updatedProduct,
          message: "products updated"
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const { productId } = req.params;

      try {
        const deletedProduct = await productService.deleteProduct({
          productId
        });

        res.status(200).json({
          data: deletedProduct,
          message: "products deleted"
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = productsApi;
