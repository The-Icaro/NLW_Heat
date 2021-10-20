import prismaClient from "../prisma";


class UserProfileService {

  public async execute(user_id : string ){

    const user = await prismaClient.user.findFirst({
      where : {
        id : user_id
      }
    });

    return user;

  }
}

export { UserProfileService }