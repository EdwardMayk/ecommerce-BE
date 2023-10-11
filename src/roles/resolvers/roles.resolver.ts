import { Resolver, Query, Args } from '@nestjs/graphql';
import { RolesService } from '../services/roles.service';
import { Role } from '../entities/role.entity';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  // @Mutation(() => Role)
  // createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
  //   return this.rolesService.create(createRoleInput);
  // }

  @Query(() => [Role], { name: 'roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('value', { type: () => String }) value: string) {
    return this.rolesService.findOne(value);
  }
}
