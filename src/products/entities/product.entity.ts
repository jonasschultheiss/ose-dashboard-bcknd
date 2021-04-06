import { Asset } from 'src/assets/entities/asset.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['code'])
export class Product extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  code: string;

  @Column()
  manufacturer: string;

  @OneToMany(() => Asset, asset => asset.product)
  assets: Asset[];
}
