import { prisma } from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";
// ---------Create a new user------------
export const createNewUser = async (req: any, res: any) => {
  //we
  const hash = await hashPassword(req.body.password);
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);

  //response is a token
  res.json({
    token: token,
    message: "Congratulations, you're a new member",
  });
};

/// ---------SIGN IN-----------
export const signIn = async (req: any, res: any) => {
  //check if user have already exits
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  const isValid = await comparePassword(req.body.password, user!.password);
  if (!isValid) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }

  const token = createJWT(user);
  res.json({
    token: token,
    message: "Oops👏 welcomes back my friend",
  });
};
