import createUser from "./create.service";
import deleteUser from "./delete.service";
import getUser from "./getuser.service";
import getUserDetails from "./getUserDetails.service";
import getUsers from "./getUsers.service";
import loginUser from "./login.service";
import updateUser from "./update.service";
import updatePasswordService from "./updatePassword.service";

export const userServices = {
  createUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
  deleteUser,
  getUserDetails,
  updatePasswordService,
};
