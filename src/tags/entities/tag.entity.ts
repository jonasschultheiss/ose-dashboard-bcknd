import { Asset } from 'src/assets/entities/asset.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('tags')
export class Tag extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  accessibility: string;

  @Column({ nullable: true })
  criticality: string;

  @OneToMany(() => Asset, asset => asset.status)
  assets: Asset[];
}
