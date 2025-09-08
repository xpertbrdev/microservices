import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ObjectType, Field } from '@nestjs/graphql';
import { LegacyAdapterService } from '../services/legacy-adapter.service';

@ObjectType()
class HealthStatus {
  @Field()
  status: string;

  @Field()
  timestamp: Date;

  @Field()
  counts: string; // JSON string com contadores
}

@Resolver()
export class HealthResolver {
  constructor(
    @Inject('LegacyAdapterService') 
    private readonly legacyAdapterService: LegacyAdapterService
  ) {}

  @Query(() => HealthStatus, { name: 'health' })
  async getHealthCheck(): Promise<HealthStatus> {
    const health = await this.legacyAdapterService.getHealthCheck();
    
    return {
      status: health.status,
      timestamp: health.timestamp,
      counts: JSON.stringify(health.counts),
    };
  }
}

