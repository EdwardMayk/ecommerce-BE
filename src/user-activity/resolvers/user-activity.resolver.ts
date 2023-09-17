import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { UserActivity } from '../entities/user-activity.entity';
import { UserActivityService } from '../services/user-activity.service';

@Resolver(() => UserActivity)
export class UserActivityResolver {
  constructor(private readonly userActivityService: UserActivityService) {}

  @Query(() => [UserActivity], { name: 'userActivity' })
  findAll() {
    return this.userActivityService.findAll();
  }

  @Query(() => UserActivity, { name: 'userActivity' })
  findOne(@Args('uuid', { type: () => Int }) uuid: string) {
    return this.userActivityService.findByUuid(uuid);
  }

  @Mutation(() => UserActivity)
  removeUserActivity(@Args('id', { type: () => Int }) id: number) {
    return this.userActivityService.remove(id);
  }
}
