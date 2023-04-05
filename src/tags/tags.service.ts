import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tag.model';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private tagRepository: typeof Tag) {}
  async createTag(dto: CreateTagDto) {
    const candidate = await this.tagRepository.findOne({
      where: {
        tagName: dto.tagName,
      },
    });
    if (candidate) {
      throw new HttpException(
        `Tag with tagname ${dto.tagName} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const tag = await this.tagRepository.create(dto);
    return tag;
  }

  async deleteTag(tagId:number) {
    const tag = await this.tagRepository.destroy({
      where: {
        id: tagId,
      },
    });
    return tag
  }
}
