import dotenv from 'dotenv';
import User from '../models/users';
import userRepo from '../repositories/userRepo';

dotenv.config({});

async function populateUserTable() {
  await userRepo.addUser(
    new User(
      'kirk',
      'pass',
      'kirk',
      'employee',

    ),
  );
}
(async () => {
  try {
    await populateUserTable();
  } catch(error) {
    console.log('Failed to populate table: ', error);
  }
})();
