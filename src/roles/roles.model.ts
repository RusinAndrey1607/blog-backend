import { ApiProperty } from '@nestjs/swagger';
import { Model, Column, DataType, Table,BelongsToMany } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-role.model';


interface RoleCreationAttrs {
    value:string
    description:string
}
@Table({
  tableName: 'roles',
})
export class Role extends Model<Role,RoleCreationAttrs> {
  @ApiProperty({example:1,description:"Unique id"})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({example:"ADMIN",description:"Unique Role Value"})
  @Column({
    type: DataType.STRING,
    unique:true,
    allowNull:false
  })
  value: string;

  @ApiProperty({example:"Administrator",description:"Role description"})
  @Column({
    type: DataType.STRING,
    allowNull:false
  })
  description: string;

  @BelongsToMany(() =>User, () => UserRoles)
  users:User[]
}
