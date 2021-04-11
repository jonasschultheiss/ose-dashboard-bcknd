import { Mesh } from 'src/meshes/entities/mesh.entity';
import { Model } from 'src/models/entities/model.entity';
import { Product } from 'src/products/entities/product.entity';
import { Status } from 'src/status/entities/status.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { LinkingStatus } from '../enums/linkingStatus.enum';

@Entity()
@Unique(['serialNumber'])
export class Asset extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  serialNumber: string;

  @Column({ nullable: true })
  productionDate: string;

  @Column({ nullable: true })
  lastSeen: string;

  @ManyToOne(() => Status, status => status.assets, { eager: true })
  @JoinTable()
  status: Status;

  @ManyToOne(() => Product, product => product.assets, { eager: true })
  @JoinTable()
  product: Product;

  @ManyToOne(() => Tag, tag => tag.assets, { eager: true })
  @JoinTable()
  tag: Tag;

  @ManyToOne(() => Mesh, mesh => mesh.assets, { eager: true })
  @JoinTable()
  mesh: Mesh;

  @ManyToOne(() => Model, model => model.assets)
  model: Model;

  @Column({ type: 'enum', enum: LinkingStatus, default: LinkingStatus.NOT_LINKED })
  linkingStatus: LinkingStatus;
}
