import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    creatAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // 같은 username이있는지 email이있는지 확인
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });
      const uglyPassword = await bcrypt.hash(password, 10);
      return client.user.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
      // 만약에 없다면 password 를 hash화할것이다
      // 여기까지 잘진행되면 내용저장후 user를 return할것이다
    },
  },
};
