import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Post } from 'src/posts/post.model';
import { User } from 'src/users/users.model';

interface ProfileCreationAttrs {
  name: string;
  username: string;
  avatar?: string;
  header?: string;
  bio?: string;
  userId: number;
}

@Table({
  tableName: 'profiles',
})
export class Profile extends Model<Profile, ProfileCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.jpg',
    description: 'Avatar Filename',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  avatar: string;

  @ApiProperty({
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.jpg',
    description: 'Header Filename',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  header: string;

  @ApiProperty({ example: 'Just Bio!', description: 'Profile information' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  bio: string;

  @ApiProperty({ example: 'John Doe', description: 'Profile name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '@johndoe', description: 'Unique Profile username' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId: number;

  @HasMany(() => Post)
  posts: Post[];
}
