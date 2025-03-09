import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { User } from "../entities/user";

const postUserData = async (req: Request, res: Response) => {
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

const fetchUserData = async (req: Request, res: Response) => {
  try {
    const users: User[] = [];
    const querySnapshot = await getDocs(collection(db, "USERS"));
    querySnapshot.forEach((doc) => {
      const data: User = {
        _id: doc.id,
        totalAverageWeightRatings: doc.data().totalAverageWeightRatings,
        numberOfRents: doc.data().numberOfRents,
        recentlyActive: doc.data().recentlyActive,
      };
      users.push(data);
    });
    res.json(users);
  } catch (e) {
    console.error("Error fetching documents: ", e);
    res.status(500).send({ message: "Error fetching documents" });
  }
};

const updateUserData = async (req: Request, res: Response) => {
  try {
    await setDoc(doc(db, "USERS", req.params.id), req.body);
    const id: string = req.params.id;
    const docRef = doc(db, "USERS", id);
    const fetchData = await getDoc(docRef);
    const data = fetchData.data();

    const user: Partial<User> = {
      _id: fetchData.id,
      totalAverageWeightRatings: data?.totalAverageWeightRatings,
      numberOfRents: data?.numberOfRents,
      recentlyActive: data?.recentlyActive,
    };

    res.json(user);
  } catch (error) {
    console.error("Error updating document: ", error);
    res.send("Error updating document");
  }
};

export { postUserData, fetchUserData, updateUserData };
