import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { DataLoaderService } from './dataloader.service';

@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
  constructor(private readonly dataLoaderService: DataLoaderService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();

    // Injetar DataLoaders no contexto GraphQL
    if (!ctx.dataLoaders) {
      ctx.dataLoaders = this.dataLoaderService;
    }

    return next.handle();
  }
}

