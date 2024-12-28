import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import generateAccessToken from "../../../../utils/generateAccessToken";
import AppError from "../../../errors/AppErrors";

const prisma = new PrismaClient();

// Service for create user account
const createUser = async (data: any) => {
  let { first_name, last_name, email, phone, password } = data;

  const userExixts = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExixts) throw new AppError(400, "User Allready exist");

  const hashedPassword: String = await bcrypt.hash(password, 10);

  const UserData: any = {
    first_name,
    last_name,
    email,
    phone,
    password: hashedPassword,
  };

  try {
    const createUser = await prisma.user.create({
      data: UserData,
    });

    const token: String = generateAccessToken(createUser.id);

    return {
      user: createUser,
      AccessToken: token,
    };
  } catch (error) {
    throw error;
  }
};

export default createUser;
