import { Asset } from 'src/assets/entities/asset.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('models')
@Unique(['id', 'name'])
export class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  location: string;

  @OneToOne(() => User, user => user.model, { eager: true })
  @JoinColumn()
  owner: User;

  @OneToMany(() => Asset, asset => asset.status)
  assets: Asset[];
}
