import { Asset } from 'src/assets/entities/asset.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['code', 'name'])
export class Status extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Asset, asset => asset.status)
  assets: Asset[];
}
