import { prisma } from "../db";

export const getProduct = async (req: any, res: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.json({
    data: user?.products,
  });
};

export const getOneProduct = async (req: any, res: any) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id: id,
      belongsToId: req.user.id,
    },
  });
  res.json({
    data: product,
  });
};
export const createNewProduct = async (req: any, res: any) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};
export const updateProduct = async (req: any, res: any) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: updated });
};
