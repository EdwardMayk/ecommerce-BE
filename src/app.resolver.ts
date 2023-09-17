import { Resolver, Query, Mutation, Subscription } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }

  @Mutation(() => String)
  async addMessage(message: string) {
    return message;
  }

  @Subscription(() => String)
  messageAdded() {
    return 'Message added!';
  }
}
