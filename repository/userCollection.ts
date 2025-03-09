import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { User } from "../entities/user";

export default function userCollection(
  querySnapshot: QuerySnapshot<DocumentData, DocumentData>
): User[] {
  const users: User[] = [];
  querySnapshot.forEach((doc) => {
    const data: User = {
      _id: doc.id,
      totalAverageWeightRatings: doc.data().totalAverageWeightRatings,
      numberOfRents: doc.data().numberOfRents,
      recentlyActive: doc.data().recentlyActive,
    };
    users.push(data);
  });
  return users;
}
