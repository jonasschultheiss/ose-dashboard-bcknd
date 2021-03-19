import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  last_seen: string;
}
