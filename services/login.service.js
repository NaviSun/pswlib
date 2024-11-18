import argon2 from "argon2";
import User from "../models/User.js";
import { readFileSync } from "fs";
import { ACCESS_TOKEN_SECRET, COOKIE_NAME } from "../config/index.js";
import { signToken } from "../utils/token.js";

export const loginUser = async (req, res, next) => {
  const usernameOrEmail = req.body?.usernameOrEmail;
  const password = req.body?.password;

  // const PRIVATE_KEY = readFileSync("./config/private_key.pem", "utf8");

  //Если не указали логин или пароль
  if (!usernameOrEmail || !password) {
    return res
      .status(400)
      .json({ message: "Username or email and password must be provided" });
  }
  //Пробуем найти юзера в базе по логину или email
  try {
    let user;
    if (usernameOrEmail.includes("@")) {
      user = await User.findOne({ email: usernameOrEmail }).select("+password");
    } else {
      user = await User.findOne({ username: usernameOrEmail }).select(
        "+password"
      );
    }
    //Если пользователь не найден в базе
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //Проверка пароля на совпадение
    const isPasswordCorrect = await argon2.verify(user.password, password);
    //Если пароль не верный
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Wrong credentials" });
    }

    //Получаем токен на 1 час
    const accessToken = await signToken(
      { userId: user.userId, role: user.role },
      ACCESS_TOKEN_SECRET
    );

    return res
      .cookie(COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie('username', user.username)
      .status(200)
      .redirect('/auth/app');

    //отдаем в запрос данные пользователя
    /*    req.user = { userId: user.id, username: user.username, role: user.role }; */
  } catch (e) {
    console.log("*loginUser service");
    next(e);
  }
};
