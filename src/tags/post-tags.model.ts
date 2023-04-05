
import { ApiProperty } from '@nestjs/swagger';
import { Model, Column, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { Tag } from './tag.model';
import { Post } from 'src/posts/post.model';

@Table({
  tableName: 'tag_posts',
  createdAt:false,
  updatedAt:false
})
export class TagPosts extends Model<TagPosts> {
  @ApiProperty({example:1,description:"Unique id"})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(()=> Tag)
  @Column({
    type: DataType.INTEGER,
  })
  tagId:number

  @ForeignKey(()=> Post)
  @Column({
    type: DataType.INTEGER,
  })
  postId:number

}

