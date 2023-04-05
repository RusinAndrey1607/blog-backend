import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Profile } from 'src/profiles/profile.model';
import { TagPosts } from 'src/tags/post-tags.model';
import { Tag } from 'src/tags/tag.model';
import { Comment } from 'src/comments/comment.model';

interface PostCreationAttrs {
  title: string;
  slug: string;
  content: string;
  authorId: number;
  image?: string;
}

@Table({
  tableName: 'posts',
})
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'First Post',
    description: 'Post title',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.jpg',
    description: 'Post image',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  image: string;

  @ApiProperty({
    example: 'first-post',
    description: 'Post slug',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example: '<h1>Post content</h1> ',
    description: 'Post content',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => Profile)
  @Column
  authorId: number;

  @BelongsTo(() => Profile)
  profile: Profile;

  @BelongsToMany(() => Tag, () => TagPosts)
  tags: Tag[];

  @HasMany(() => Comment)
  comments: Comment[];
}
