import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Directive } from '@nestjs/graphql';
import { Entidade } from './entidade.entity';

@ObjectType()
@Directive('@key(fields: "idProdutos idFilial")')
@Entity('PRODUTOS')
export class Produto {
  @Field(() => ID)
  @PrimaryColumn({ name: 'ID_PRODUTOS' })
  idProdutos: number;

  @Field(() => Int)
  @PrimaryColumn({ name: 'ID_FILIAL' })
  idFilial: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'ID_ENTIDADE', nullable: true })
  idEntidade?: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'ID_LOCALVENDAS', nullable: true })
  idLocalVendas?: number;

  @Field(() => Int)
  @Column({ name: 'ID_GRUPOPRODUTOS' })
  idGrupoProdutos: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'ID_MARCAS', nullable: true })
  idMarcas?: number;

  @Field(() => String, { nullable: true })
  @Column({ name: 'CODIGOPRODUTO', length: 15, nullable: true })
  codigoProduto?: string;

  @Field(() => String)
  @Column({ name: 'NOMEPRODUTO', length: 50 })
  nomeProduto: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'UNIDADE', length: 4, nullable: true })
  unidade?: string;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'TIPOTRIBUTACAO', nullable: true })
  tipoTributacao?: number;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'REDUCAOICMS', type: 'real', nullable: true })
  reducaoIcms?: number;

  @Field(() => String, { nullable: true })
  @Column({ name: 'CODIGOBARRAPRODUTO', length: 20, nullable: true })
  codigoBarraProduto?: string;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'ORIGEMPRODUTO', nullable: true })
  origemProduto?: number;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'MARGEMLUCRO', type: 'real', nullable: true })
  margemLucro?: number;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'ALIQUOTAIPI', type: 'real', nullable: true })
  aliquotaIpi?: number;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'ALIQUOTAISS', type: 'real', nullable: true })
  aliquotaIss?: number;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'ALIQUOTAICMS', type: 'real', nullable: true })
  aliquotaIcms?: number;

  @Field(() => Boolean)
  @Column({ name: 'PRODUTOCOMPOSTO', type: 'bit' })
  produtoComposto: boolean;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'CUSTOMEDIO', type: 'decimal', precision: 18, scale: 6, nullable: true })
  custoMedio?: number;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'CUSTOGERENCIAL', type: 'real', nullable: true })
  custoGerencial?: number;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'MARGEMSUBST', type: 'real', nullable: true })
  margemSubst?: number;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'QTDETOTAL', type: 'real', nullable: true })
  qtdeTotal?: number;

  @Field(() => Date, { nullable: true })
  @Column({ name: 'DATACADASTRO', type: 'smalldatetime', nullable: true })
  dataCadastro?: Date;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'DESCONTOMAXIMO', type: 'real', nullable: true })
  descontoMaximo?: number;

  @Field(() => Boolean)
  @Column({ name: 'ATIVO', type: 'bit', default: true })
  ativo: boolean;

  @Field(() => String, { nullable: true })
  @Column({ name: 'NCM', length: 8, nullable: true })
  ncm?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'CEST', length: 15, nullable: true })
  cest?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'LOCALIZACAO', length: 30, nullable: true })
  localizacao?: string;

  @Field(() => Date, { nullable: true })
  @Column({ name: 'ULTALTERACAO', type: 'smalldatetime', nullable: true })
  ultAlteracao?: Date;

  // Relacionamento com Entidade
  @Field(() => Entidade, { nullable: true })
  @ManyToOne(() => Entidade, { nullable: true })
  @JoinColumn([
    { name: 'ID_ENTIDADE', referencedColumnName: 'idEntidade' },
    { name: 'ID_FILIAL', referencedColumnName: 'idFilial' }
  ])
  entidade?: Entidade;
}

