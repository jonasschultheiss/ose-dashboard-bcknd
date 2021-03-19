import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagDto } from './dto/tag.dto';
import { TagRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagRepository)
    private readonly tagRepository: TagRepository,
  ) {}

  async getOrCreateTag(tagDto: TagDto) {
    if (!tagDto.instrumentations || !tagDto.instrumentations.items[0] || !tagDto.instrumentations.items[0].id) {
      return null;
    }

    let tag = await this.tagRepository.findOne(tagDto.instrumentations.items[0].id);
    if (!tag) {
      tag = await this.tagRepository.createTag(tagDto);
    } else {
      tag = await this.tagRepository.updateTag(tagDto);
    }

    return tag;
  }
}
