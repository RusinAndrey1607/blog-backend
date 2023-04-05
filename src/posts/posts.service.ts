import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Op } from 'sequelize';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    private readonly fileService: FilesService,
    private readonly profileService: ProfilesService,
  ) {}

  private async generateSlug(title: string) {
    let slug;
    slug = title.toLowerCase();
    slug = slug.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      '',
    );
    slug = slug.replace(/ /gi, '-');
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
  }
  async createPost(userId: number, dto: CreatePostDto, image: any) {
    const author = await this.profileService.getById(userId);
    if (!author) {
      throw new HttpException(`Profile not found`, HttpStatus.BAD_REQUEST);
    }

    const slug = await this.generateSlug(dto.title);
    const slugUsed = await this.postRepository.findOne({
      where: {
        slug,
      },
    });

    if (slugUsed) {
      throw new HttpException(
        `Article with title ${dto.title} already exist please choose another one`,
        HttpStatus.BAD_REQUEST,
      );
    }
    let imageFileName = '';
    if (image) {
      imageFileName = await this.fileService.createFile(image);
    }

    const post = await this.postRepository.create({
      ...dto,
      slug,
      authorId: author.id,
      image: imageFileName,
    });
    if (dto.tags) {
      await post.$set('tags', dto.tags);
    }
    return post;
  }
  async deletePost(id: number, userId: number) {
    const author = await this.profileService.getById(userId);
    if (!author) {
      throw new HttpException(`Profile not found`, HttpStatus.BAD_REQUEST);
    }
    const post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new HttpException(`Post not found`, HttpStatus.BAD_REQUEST);
    }
    if (post.authorId !== author.id) {
      throw new HttpException(
        `You aren't allowed to delete this post. You aren't the author`,
        HttpStatus.FORBIDDEN,
      );
    }
    const deleted = await post.destroy();
    return deleted;
  }
  async getAllPosts(limit: number = 20, offset: number = 0) {
    const posts = this.postRepository.findAll({
      limit,
      offset,
      include: { all: true },
    });
    return posts;
  }
  async getByQuery(query: string, limit: number = 20, offset: number = 0) {
    const posts = this.postRepository.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: '%' + query + '%' } },
          { slug: { [Op.like]: '%' + query + '%' } },
          { content: { [Op.like]: '%' + query + '%' } },
        ],
      },
      limit,
      offset,
      include: { all: true },
    });
    return posts;
  }
  async updatePost(userId: number, dto: UpdatePostDto, image: any) {
    const author = await this.profileService.getById(userId);
    if (!author) {
      throw new HttpException(`Profile not found`, HttpStatus.BAD_REQUEST);
    }
    const post = await this.postRepository.findByPk(dto.postId);
    if (!post) {
      throw new HttpException(`Post not found`, HttpStatus.BAD_REQUEST);
    }
    if (post.authorId !== author.id) {
      throw new HttpException(
        `You aren't allowed to update this post. You aren't the author`,
        HttpStatus.FORBIDDEN,
      );
    }

    let imageFileName = '';
    if (image) {
      post.image && (await this.fileService.deleteFile(post.image));
      imageFileName = await this.fileService.createFile(image);
    }
    await post.update({
      ...dto,
      tags: post.tags,
      image: imageFileName,
    });
    const tags = JSON.parse(dto.tags);
    if (tags) {
      await post.$set('tags', tags);
    }
    return post;
  }
  async getBySlug(slug: string) {
    const post = await this.postRepository.findOne({
      where: {
        slug,
      },
      include: { all: true },
    });
    return post;
  }
  async getAllSlugs(){
    const slug = await this.postRepository.findAll({
      attributes:['slug']
    })
    return slug
  }
}
