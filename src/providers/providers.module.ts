import { Module } from '@nestjs/common';
import { ProvidersService } from './services/providers.service';

@Module({
  providers: [ProvidersService],
})
export class ProvidersModule {}
