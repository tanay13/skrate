import { Router, Response } from "express";
import { validationResult } from "express-validator/check";

import HttpStatusCodes from "http-status-codes";

import Request from "../../types/Request";
import Meeting, { IMeeting } from "../../models/Meeting";
import User, { IUser } from "../../models/User";

const router: Router = Router();

router.post("/new", async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { user, date } = req.body;
  console.log(user);
  try {
    let user1: IUser = await User.findOne({ username: user[0] });
    let user2: IUser = await User.findOne({ username: user[1] });
    if (!user1 || !user2 || user1.id == user2.id) {
      return res.json({
        msg: "Error",
      });
    }
    // Build user object based on IMeeting
    const meetingFields = {
      user: [user1.id, user2.id],
      date,
    };
    const meeting = new Meeting(meetingFields);
    await meeting.save();
    res.json({
      meeting: meeting.id,
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
    const meetings = await Meeting.find({});
    res.json({
      meetings,
    });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
