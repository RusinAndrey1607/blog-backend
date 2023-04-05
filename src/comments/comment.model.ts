import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Post } from 'src/posts/post.model';
import { Profile } from 'src/profiles/profile.model';

interface CommentCreationAttrs {
  authorId: number;
  postId: number;
  comment: string;
}

@Table({
  tableName: 'comments',
})
export class Comment extends Model<Comment, CommentCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'true', description: 'Wheter comment banned or not' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  banned: boolean;

  @ApiProperty({ example: "This is a good post!", description: 'Comment' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;

  @ForeignKey(() => Profile)
  @Column
  authorId: number;

  @BelongsTo(() => Profile)
  profile: Profile;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => Post)
  post: Post;
}
