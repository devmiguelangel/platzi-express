const express = require("express");
const ProductService = require("../../services/products");
// const { validateRequest } = require("../../utils/middlewares/validationHandler");
const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema
} = require("../../utils/schemas/products");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { tags } = req.query;

  try {
    // throw new Error('This is an error from the API.')
    const products = await ProductService.getProducts({ tags });

    res.status(200).json({
      data: products,
      message: "products listed"
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await ProductService.getProduct({ productId });

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
        return ProductService.createProduct({ product });
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
      
    const validateProduct = await createProductSchema.validate(product, { abortEarly: false });
    const createdProduct = await ProductService.createProduct({ product });

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

router.put("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { body: product } = req;

    try {
      const updatedProduct = await ProductService.updateProduct({
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

router.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await ProductService.deleteProduct({ productId });

    res.status(200).json({
      data: deletedProduct,
      message: "products deleted"
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
