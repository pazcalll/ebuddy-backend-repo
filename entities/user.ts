import { z } from "zod";

const validationOptions = {
  required_error: "This field is required",
};

const UserSchema = z.object({
  _id: z.string(validationOptions),
  totalAverageWeightRatings: z.number(validationOptions),
  numberOfRents: z.number(validationOptions),
  recentlyActive: z.number(validationOptions),
});

type TUser = z.infer<typeof UserSchema>;

export { UserSchema, TUser };
