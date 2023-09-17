import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProvidersService } from '../services/providers.service';
import { Provider } from '../entities/provider.entity';
import { CreateProviderInput } from '../dto/create-provider.input';
import { UpdateProviderInput } from '../dto/update-provider.input';

@Resolver(() => Provider)
export class ProvidersResolver {
  constructor(private readonly providersService: ProvidersService) {}

  @Mutation(() => Provider)
  createProvider(
    @Args('createProviderInput') createProviderInput: CreateProviderInput,
  ) {
    return this.providersService.create(createProviderInput);
  }

  @Query(() => [Provider], { name: 'providers' })
  findAll() {
    return this.providersService.findAll();
  }

  @Query(() => Provider, { name: 'provider' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.providersService.findOne(id);
  }

  @Mutation(() => Provider)
  updateProvider(
    @Args('updateProviderInput') updateProviderInput: UpdateProviderInput,
  ) {
    return this.providersService.update(
      updateProviderInput.id,
      updateProviderInput,
    );
  }

  @Mutation(() => Provider)
  removeProvider(@Args('id', { type: () => Int }) id: number) {
    return this.providersService.remove(id);
  }
}
