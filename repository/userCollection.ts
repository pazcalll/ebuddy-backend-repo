import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { User } from "../entities/user";

const postUserData = async (req: Request, res: Response) => {
  if (!req.body)
    res.status(400).send({
      message: "Content can not be empty!",
    });
  if (!req.body.totalAverageWeightRatings)
    res.status(400).send({
      message: "Content can not be empty!",
    });
  if (!req.body.numberOfRents)
    res.status(400).send({
      message: "Content can not be empty!",
    });
  if (!req.body.recentlyActive)
    res.status(400).send({
      message: "Content can not be empty!",
    });

  try {
    const user: Partial<User> = {
      totalAverageWeightRatings: req.body.totalAverageWeightRatings,
      numberOfRents: req.body.numberOfRents,
      recentlyActive: req.body.recentlyActive,
    };
    const docRef = await addDoc(collection(db, "USERS"), user);

    user._id = docRef.id;

    res.json(user);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  //   res.send("Posting user data");
};

export default postUserData;
