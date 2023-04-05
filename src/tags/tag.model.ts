import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { Post } from 'src/posts/post.model';
import { TagPosts } from './post-tags.model';

interface TagCreationAttrs {
  tagName: string;
}
@Table({
  tableName: 'tags',
})
export class Tag extends Model<Tag, TagCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Financy', description: 'tagName' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  tagName: string;

  @BelongsToMany(() => Post, () => TagPosts)
  posts: Post[];
}
