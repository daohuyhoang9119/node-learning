import { validationResult } from "express-validator";

export const handleInputErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401);
    res.json({
      errors: errors.array(),
      message: "Can't update ❌",
    });
  } else {
    res.status(200);
    res.json({
      message: "Update Successfully ✨",
    });
    next();
  }
};
