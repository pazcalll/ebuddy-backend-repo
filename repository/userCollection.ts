import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { TUser } from "../entities/user";

export default function userCollection(
  querySnapshot: QuerySnapshot<DocumentData, DocumentData>
): TUser[] {
  const users: TUser[] = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    const data: TUser = {
      _id: doc.id,
      totalAverageWeightRatings: docData.totalAverageWeightRatings,
      numberOfRents: docData.numberOfRents,
      recentlyActive: docData.recentlyActive,
    };
    users.push(data);
  });
  return users;
}
