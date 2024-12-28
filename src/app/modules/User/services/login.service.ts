import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import generateAccessToken from "../../../../utils/generateAccessToken";
import AppError from "../../../errors/AppErrors";

const prisma = new PrismaClient();

// login user
const loginUser = async (data: any) => {
  const { email, password } = data?.body;

  console.log(email, password);

  if (!email || !password)
    throw new AppError(404, "Please Provide all required information");

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new AppError(404, "User Not Found!");

  try {
    if (user && (await bcrypt.compare(password, user?.password))) {
      const accessToken: String = generateAccessToken(user?.id);

      return { user, accessToken };
    } else {
      throw new AppError(404, "Invalid Creadential!");
    }
  } catch (error) {
    throw error;
  }
};

export default loginUser;
