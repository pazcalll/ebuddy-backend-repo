import { Request, Response } from "express";
import { admin, db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { TUser, UserSchema } from "../entities/user";
import userCollection from "../repository/userCollection";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { TAuthenticatedUser } from "../entities/auth";
import { TFirebaseUser, TFirebaseUserProfile } from "../entities/firebaseUser";

const postUserData = async (req: Request, res: Response) => {
  try {
    const validated = UserSchema.omit({ _id: true }).parse(req.body);
    const docRef = await addDoc(collection(db, "USERS"), validated);

    const v: TUser = {
      _id: docRef.id,
      ...validated,
    };

    res.json(v);
  } catch (e) {
    console.error("Error adding document: ", e);
    res.status(500).send({ message: "Error adding document" });
  }
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

const profile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const verificationResponse = await admin
      .auth()
      .verifyIdToken(token as string);
    const uid = verificationResponse.uid;
    const user: TFirebaseUserProfile = (await admin
      .auth()
      .getUser(uid)) as TFirebaseUserProfile;
    res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ message: error?.message });
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
    const detailJson: TFirebaseUser =
      userCredential.user.toJSON() as TFirebaseUser;
    const authenticated: TAuthenticatedUser = {
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

const login = async (req: Request, res: Response) => {
  try {
    const auth = getAuth();
    const body = req.body;
    const signInResponse = await signInWithEmailAndPassword(
      auth,
      body.email,
      body.password
    );
    const user = signInResponse.user;
    const providerData = user.providerData[0];
    const detailJson: TFirebaseUser = user.toJSON() as TFirebaseUser;

    const authenticated: TAuthenticatedUser = {
      uid: detailJson?.uid,
      email: providerData.email as string,
      refreshToken: user.refreshToken,
      token: detailJson?.stsTokenManager?.accessToken,
    };

    res.status(200).json(authenticated);
  } catch (error: any) {
    console.error("Error logging in user: ", error);
    res.status(400).json({ message: error?.message });
  }
};

export {
  postUserData,
  fetchUserData,
  updateUserData,
  register,
  login,
  profile,
};
