import bcryptjs from "bcryptjs";
import { User } from "../modules/user/user.model";
import { envVars } from "./../config/env";
import { IauthProvider, Role } from "../modules/user/user.interface";

export const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await User.findOne({ email: envVars.EMAIL });

    if (isExistSuperAdmin) {
      console.log("Super Admin Already Exist");
      return;
    }
    const hashedPassword = await bcryptjs.hash(
      envVars.PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
    const authProvider: IauthProvider = {
      provider: "Credentials",
      providerId: envVars.EMAIL,
    };
    const payload = {
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      email: envVars.EMAIL,
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider],
    };

    const superAdmin = await User.create(payload);

    console.log("Super Admin Created");
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};
