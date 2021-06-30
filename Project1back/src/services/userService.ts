import User from '../models/users';
import userRepo from '../repositories/userRepo';

export class UserService {
private repo = userRepo

constructor() {
  this.repo = userRepo;
}

getAll(): Promise<User[]> {
  return this.repo.getAll();
}

getByUsername(username: string): Promise<User | null> {
  return this.repo.getByUsername(username);
}

add(user: User): Promise<boolean> {
  return this.repo.addUser(new User(
    user.username,
    user.password,
    user.role,
    user.employeeName,
    user.totalReimbursement,
    user.availableReimbursement,
    user.pendingReimbursement,
    user.awardedReimbursement,
  ));
}

update(user: User): Promise<boolean> {
  return this.repo.update(new User(
    user.username,
    user.password,
    user.role,
    user.employeeName,
    user.totalReimbursement,
    user.availableReimbursement,
    user.pendingReimbursement,
    user.awardedReimbursement,
  ));
}

delete(username: string): Promise<boolean> {
  return this.repo.delete(username);
}

async login(username: string, password: string): Promise<User> {
  const user = await this.repo.getByUsername(username);

  if(!user) {
    console.log('no User');
  }

  if(user.password !== password) {
    console.log('Passwords Dont match');
  }

  return user;
}

register(user: User): Promise<boolean> {
  return this.add(user);
}
}

const userService = new UserService();

export default userService;
