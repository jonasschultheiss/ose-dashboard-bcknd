import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';
import { Tag } from './entities/tag.entity';
import ITag from './interfaces/tag.interface';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  private extractTag(tagDto: TagDto): ITag {
    const { id, tag, description, criticality, accessibility } = tagDto.instrumentations.items[0];
    return {
      id: id,
      name: tag,
      description: description,
      criticality: criticality,
      accessibility: accessibility,
    };
  }

  async createTag(tagDto: TagDto): Promise<Tag> {
    const { id, name, description, criticality, accessibility } = this.extractTag(tagDto);

    const tag = new Tag();
    tag.id = id;
    tag.name = name;
    tag.description = description;
    tag.criticality = criticality;
    tag.accessibility = accessibility;

    try {
      await tag.save();
      return tag;
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Tag with the same name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateTag(tagDto: TagDto): Promise<Tag> {
    const { id, name, description, criticality, accessibility } = this.extractTag(tagDto);
    const tag = await this.findOne(id);
    let needsSave = false;
    if (tag.name !== name) {
      tag.name = name;
      needsSave = true;
    }

    if (tag.description !== description) {
      tag.description = description;
      needsSave = true;
    }

    if (tag.criticality !== criticality) {
      tag.criticality = criticality;
      needsSave = true;
    }

    if (tag.accessibility !== accessibility) {
      tag.accessibility = accessibility;
      needsSave = true;
    }

    if (needsSave) {
      try {
        await tag.save();
        return tag;
      } catch (error) {
        throw new InternalServerErrorException();
      }
    } else {
      return tag;
    }
  }
}
