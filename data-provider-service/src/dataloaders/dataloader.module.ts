import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto, Entidade } from '../entities';
import { DataLoaderService } from './dataloader.service';
import { ProdutoDataLoader } from './produto.dataloader';
import { EntidadeDataLoader } from './entidade.dataloader';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Entidade])],
  providers: [
    DataLoaderService,
    ProdutoDataLoader,
    EntidadeDataLoader,
  ],
  exports: [
    DataLoaderService,
    ProdutoDataLoader,
    EntidadeDataLoader,
  ],
})
export class DataLoaderModule {}

