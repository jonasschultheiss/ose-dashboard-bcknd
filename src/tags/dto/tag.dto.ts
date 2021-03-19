import { SingleTagDto } from './single-tag.dto';

export class TagDto {
  readonly instrumentations: {
    readonly items: SingleTagDto[];
  };
}
