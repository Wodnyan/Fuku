import bcrypt from "bcrypt";

export const hash = (text: string) => {
  return bcrypt.hash(text, 10);
};

export const compare = (text: string, encrypted: string) => {
  return bcrypt.compare(text, encrypted);
};
