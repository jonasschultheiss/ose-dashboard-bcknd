import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id', 'name'])
export class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => User, user => user.model)
  owner: User;
}
