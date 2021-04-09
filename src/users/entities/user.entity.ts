import { Model } from 'src/models/entities/model.entity';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  finishedInitialSetup: boolean;

  @Column({ select: false })
  refreshToken: string;

  @OneToOne(() => Model, model => model.owner, { eager: true })
  @JoinColumn()
  model: Model;
}
