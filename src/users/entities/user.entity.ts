import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  finishedInitialSetup: boolean;

  @Column()
  refreshToken: string;
}
