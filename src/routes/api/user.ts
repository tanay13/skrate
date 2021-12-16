import { Router, Response } from "express";
import { validationResult } from "express-validator/check";

import HttpStatusCodes from "http-status-codes";

import Request from "../../types/Request";
import User, { IUser } from "../../models/User";

const router: Router = Router();

router.post("/new", async (req: Request, res: Response) => {
  console.log("IN");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const { username } = req.body;
  try {
    let user: IUser = await User.findOne({ username });

    if (user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "User already exists",
          },
        ],
      });
    }

    // Build user object based on IUser
    const userFields = {
      username,
    };

    user = new User(userFields);

    await user.save();

    res.json({
      userId: user.id,
    });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/all", async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  try {
    let users: IUser[] = await User.find({});
    res.json({
      users: users,
    });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
