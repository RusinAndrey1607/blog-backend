import { ApiProperty } from '@nestjs/swagger';
import { Model, Column, DataType, Table,BelongsToMany, HasMany } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-role.model';


interface UserCreationAttrs {
    email:string
    password:string
}

@Table({
  tableName: 'users',
  
})
export class User extends Model<User,UserCreationAttrs> {
  @ApiProperty({example:1,description:"Unique id"})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({example:"test@gmail.com",description:"Email"})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({example:"secretPassword",description:"Password"})

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({example:"Spam",description:"BanReason"})
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @ApiProperty({example:"true",description:"Whether user is banned or nor"})
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @BelongsToMany(() => Role,() => UserRoles)
  roles:Role[]

}
