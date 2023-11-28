import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation(() => User)
  createUserAdmin(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUserAdmin(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('uuid', { type: () => String }) uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Mutation(() => String)
  async generateResetPasswordCode(
    @Args('email') email: string,
  ): Promise<string> {
    try {
      const resetCode =
        await this.usersService.generateResetPasswordCode(email);
      return resetCode;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Args('email') email: string,
    @Args('resetCode') resetCode: string,
    @Args('newPassword') newPassword: string,
  ): Promise<boolean> {
    try {
      await this.usersService.resetPassword(email, resetCode, newPassword);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
