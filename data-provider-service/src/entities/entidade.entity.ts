import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Directive } from '@nestjs/graphql';
import { Produto } from './produto.entity';

@ObjectType()
@Directive('@key(fields: "idEntidade idFilial")')
@Entity('ENTIDADES')
export class Entidade {
  @Field(() => ID)
  @PrimaryColumn({ name: 'ID_ENTIDADE' })
  idEntidade: number;

  @Field(() => Int)
  @PrimaryColumn({ name: 'ID_FILIAL' })
  idFilial: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'ID_CIDADES', nullable: true })
  idCidades?: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'ID_EMPRESASENTIDADES', nullable: true })
  idEmpresasEntidades?: number;

  @Field(() => String, { nullable: true })
  @Column({ name: 'CODIGOENTIDADE', length: 13, nullable: true })
  codigoEntidade?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'NOMEENTIDADE', length: 50, nullable: true })
  nomeEntidade?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'RAZAOSOCIALENTIDADE', length: 70, nullable: true })
  razaoSocialEntidade?: string;

  @Field(() => Date, { nullable: true })
  @Column({ name: 'DTACADASTRO', type: 'smalldatetime', nullable: true })
  dtaCadastro?: Date;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'PESSOA', nullable: true })
  pessoa?: number;

  @Field(() => String, { nullable: true })
  @Column({ name: 'ENDERECO', length: 70, nullable: true })
  endereco?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'BAIRRO', length: 35, nullable: true })
  bairro?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'CEP', length: 8, nullable: true })
  cep?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'CNPJCPF', length: 14, nullable: true })
  cnpjCpf?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'IERG', length: 14, nullable: true })
  ieRg?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'FONE', length: 10, nullable: true })
  fone?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'CELULAR', length: 11, nullable: true })
  celular?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'EMAIL', length: 40, nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'CATEGORIA', length: 1, nullable: true })
  categoria?: string;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'DIAVCTO', nullable: true })
  diaVcto?: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'PRAZOOPERACIONAL', nullable: true })
  prazoOperacional?: number;

  @Field(() => Date, { nullable: true })
  @Column({ name: 'DTANASCIMENTO', type: 'smalldatetime', nullable: true })
  dtaNascimento?: Date;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'LIMITE', type: 'real', nullable: true })
  limite?: number;

  @Field(() => Boolean)
  @Column({ name: 'EMITIRICMS', type: 'bit', default: false })
  emitirIcms: boolean;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'CARENCIA', nullable: true })
  carencia?: number;

  @Field(() => Boolean)
  @Column({ name: 'LISTANEGRA', type: 'bit', default: false })
  listaNegra: boolean;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'TIPOPGTO', nullable: true })
  tipoPgto?: number;

  @Field(() => Boolean)
  @Column({ name: 'EMITIRFATURA', type: 'bit', default: false })
  emitirFatura: boolean;

  @Field(() => Boolean)
  @Column({ name: 'EMITIRBOLETO', type: 'bit', default: false })
  emitirBoleto: boolean;

  @Field(() => String, { nullable: true })
  @Column({ name: 'CONTATO', length: 30, nullable: true })
  contato?: string;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'CLIENTE_FORNECEDOR', nullable: true })
  clienteFornecedor?: number;

  @Field(() => Boolean)
  @Column({ name: 'DESCONTO', type: 'bit', default: false })
  desconto: boolean;

  @Field(() => String, { nullable: true })
  @Column({ name: 'OBS', length: 255, nullable: true })
  obs?: string;

  @Field(() => Boolean)
  @Column({ name: 'ATIVO', type: 'bit', default: true })
  ativo: boolean;

  @Field(() => Date, { nullable: true })
  @Column({ name: 'ULTALTERACAO', type: 'smalldatetime', nullable: true })
  ultAlteracao?: Date;

  @Field(() => String, { nullable: true })
  @Column({ name: 'NUMERO', length: 20, nullable: true })
  numero?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ name: 'VERIFICALIMITE', type: 'bit', nullable: true })
  verificaLimite?: boolean;

  @Field(() => Boolean)
  @Column({ name: 'CONSUMIDOR_FINAL', type: 'int', default: 1 })
  consumidorFinal: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'TIPO_OPERACAO', nullable: true })
  tipoOperacao?: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'TIPO_CONTRIBUINTE', nullable: true })
  tipoContribuinte?: number;

  // Relacionamento com Produtos
  @Field(() => [Produto], { nullable: true })
  @OneToMany(() => Produto, produto => produto.entidade)
  produtos?: Produto[];
}

