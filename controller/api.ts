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
import { TUser } from "../entities/user";
import userCollection from "../repository/userCollection";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserInfo,
} from "firebase/auth";
import { TAuth } from "../entities/auth";
import { TFirebaseUser, TTokenManager } from "../entities/firebaseUser";

const postUserData = async (req: Request, res: Response) => {
  try {
    const user: Partial<TUser> = {
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
    const querySnapshot = await getDocs(collection(db, "USERS"));
    const users = userCollection(querySnapshot);
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

    const user: Partial<TUser> = {
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

const register = async (req: Request, res: Response) => {
  try {
    const auth = getAuth();
    const body = req.body;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      body.email,
      body.password
    );
    const providerData = userCredential.user.providerData[0];
    const detailJson: TFirebaseUser & {
      providerData: UserInfo;
      stsTokenManager: TTokenManager;
    } = userCredential.user.toJSON() as TFirebaseUser & {
      providerData: UserInfo;
      stsTokenManager: TTokenManager;
    };
    const authenticated: TAuth = {
      uid: detailJson?.uid,
      email: providerData.email as string,
      refreshToken: userCredential.user.refreshToken,
      token: detailJson?.stsTokenManager?.accessToken,
    };
    res.status(200).json(authenticated);
  } catch (error: any) {
    console.error("Error registering user: ", error);
    res.status(400).json({ message: error?.message });
  }
};

export { postUserData, fetchUserData, updateUserData, register };
