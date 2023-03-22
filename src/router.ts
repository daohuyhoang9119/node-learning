import express, { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middlewares";

const router = Router();

//-----Product
router.get("/product", (req, res) => {
  console.log("from product route");
  res.json({ message: "product" });
});
router.get("/product/:id", () => {});
router.put("/product/:id", body("name"), handleInputErrors, (req, res) => {});
router.post("/product", body("name"), handleInputErrors, (req, res) => {});
router.delete("/product/:id", () => {});

//-----Update
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "LIVE", "DEPRECATED", "ARCHIVED"]),
  body("version").optional(),
  () => {}
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  () => {}
);
router.delete("/update/", () => {});

//-----Update-point
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.delete("/updatepoint/", () => {});

export default router;
