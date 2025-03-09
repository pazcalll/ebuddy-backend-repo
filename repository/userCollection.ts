import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { TUser } from "../entities/user";

export default function userCollection(
  querySnapshot: QuerySnapshot<DocumentData, DocumentData>
): TUser[] {
  const users: TUser[] = [];
  querySnapshot.forEach((doc) => {
    const data: TUser = {
      _id: doc.id,
      totalAverageWeightRatings: doc.data().totalAverageWeightRatings,
      numberOfRents: doc.data().numberOfRents,
      recentlyActive: doc.data().recentlyActive,
    };
    users.push(data);
  });
  return users;
}
