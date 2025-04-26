import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../prisma";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { config } from "../../config";
import { JwtPayload } from "jsonwebtoken";
import EmailSender from "../../mailer/EmailSender";
import ApiError from "../../middlewares/apiError";
import httpStatus from "http-status";

class Service {
  // Register user with return type
  async registerUser(payload: User): Promise<Omit<User, 'password'>> {  // Return type is Promise<Omit<User, 'password'>>
    const hashedPassword = await bcrypt.hash(payload.password, 12);  
    const createUser = await prisma.user.create({
      data: {
        email: payload.email,
        password: hashedPassword
      },
    }); 
    const { password, ...userWithoutPassword } = createUser; 
    return userWithoutPassword;
  }

  // Login user with return type
  async loginUser(payload: { email: string; password: string }): Promise<{ accessToken: string; refreshToken: string; data: { email: string; id: string } }> {  // Return type is Promise<{ accessToken, refreshToken, data }>
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: payload.email,
      },
    });
    console.log('user', user);
    const isPasswordMatched = await bcrypt.compare(
      payload.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new Error("password is incorrect");
    }
    const { email, id } = user;
    /* create access token */
    const accessToken = jwtHelpers.generateToken(
      { email, id },
      config.secret_access_token as string,
      config.access_token_expires_in as string,
    );
    /* create refresh token */
    const refreshToken = jwtHelpers.generateToken(
      { email, id },
      config.refresh_token as string,
      config.refresh_token_exp as string,
    );
    return {
      accessToken,
      refreshToken,
      data: {
        email, 
        id
      },
    };
  }

  // Forgot password with return type
  async forgotPassword(payload: JwtPayload): Promise<void> {  // Return type is Promise<void>
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: payload.email, 
      },
    });

    const resetToken = jwtHelpers.generateToken(
      { id: user.id, email: user.email },
      config.reset_pass_token as string,
      config.reset_pass_exp as string,
    );

    const resetPassLink =
      config.reset_pass_link +
      `/reset-password?userId=${user.id}&token=${resetToken}`;

    EmailSender(payload.email as string, resetPassLink);
  }

  // Reset password with return type
  async resetPassword(token: string, payload: { id: string; password: string }): Promise<Omit<User, 'password'>> {  // Return type is Promise<Omit<User, 'password'>>
    const validToken = jwtHelpers.verifyToken(
      token,
      config.reset_pass_token as string,
    );

    if (!validToken) {
      throw new ApiError(httpStatus.FORBIDDEN, "Invalid token provided");
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: payload.id, 
      },
    });

    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const resetPassword = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
      },
      select: {
        id: true, 
        email: true, 
      },
    });
    return resetPassword;
  }
}

export const AuthService = new Service();
