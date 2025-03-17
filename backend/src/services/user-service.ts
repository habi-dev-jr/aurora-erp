import 'multer';
import {User} from '../entities';
import {getConnection} from 'typeorm';
import bcrypt from 'bcryptjs';

export const processLogIn = async (
  username: string,
  password: string,
  relations?: string[]
) => {
  const user = await getConnection()
    .getRepository(User)
    .findOne({
      where: {
        username: username,
        isEnabled: true,
      },
      relations: relations,
    });

  if (user) {
    const validUser = await bcrypt.compare(password, user.password);
    if (validUser) {
      return user;
    }
  }

  return undefined;
};

export const getUserDetail = async (userId: number, relations?: string[]) => {
  return await getConnection()
    .getRepository(User)
    .findOne({
      where: {
        id: userId,
      },
      relations: relations,
    });
};

export const checkPasswordInvalid = async (
  userId: number,
  password: string,
  relations?: string[]
) => {
  const user = await getConnection()
    .getRepository(User)
    .findOne({
      where: {
        id: userId,
      },
      relations: relations,
    });
  if (user) {
    const validUser = await bcrypt.compare(password, user.password);
    if (validUser) {
      return true;
    }
  }
  return false;
};

export const updatePassword = async (userId: number, password: string) => {
  const newPassword = await bcrypt.hash(password, 10);
  return await getConnection().getRepository(User).update(
    {id: userId},
    {
      password: newPassword,
    }
  );
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const user = await getConnection()
    .getRepository(User)
    .findOne({
      where: {
        username: username,
      },
    });
  if (user) throw new Error('User already exists.');
  const encodePassword = await bcrypt.hash(password, 10);
  return await getConnection().getRepository(User).save({
    username: username,
    email: email,
    password: encodePassword,
    isEnabled: true,
  });
};

export const updateUser = async (userId: number, email: string) => {
  return await getConnection().getRepository(User).update(
    {id: userId},
    {
      email: email,
    }
  );
};
