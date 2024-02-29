
import { IUser } from '../entities';
import seedUsers from '../../seeds/seedUsers.json';
import { SeedConfigType } from '../interfaces/SeedConfigType';
import { userService } from '../services';



const user_Json = seedUsers as unknown as SeedConfigType;


export async function createBaseUsers() {

  const users: IUser[] = user_Json.users;


  if (
    !Array.isArray(users) 
  ) {
    return;
  }


  for (const user of users) {




    const userInDB = await userService.findUserByEmail(user.email);

    if (!userInDB) {
      await userService.createUser(user);
    } 

  }
}
