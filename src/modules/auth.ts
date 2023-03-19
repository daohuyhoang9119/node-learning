import jwt from "jsonwebtoken";

export const createJWT = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET!
  );
  return token;
};

export const protect = (req: any, res: any, next: any) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }
  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "token not valid" });
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (error) {
    console.error(error);
    res.status(401);
    res.send("Not authorized");
    return;
  }
};
