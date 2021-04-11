import { EntityRepository, Repository } from 'typeorm';
import { Mesh } from './entities/mesh.entity';

@EntityRepository(Mesh)
export class MeshesRepository extends Repository<Mesh> {}
