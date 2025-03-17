import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('username', ['username'], {unique: true})
@Entity('user', {schema: 'erp_db'})
export class User {
  @PrimaryGeneratedColumn({type: 'int', name: 'id'})
  id: number;

  @Column('enum', {name: 'user_type', enum: ['root', 'sub', 'org']})
  userType: 'root' | 'sub';

  @Column('varchar', {name: 'username', unique: true, length: 50})
  username: string;

  @Column('varchar', {name: 'email', length: 255})
  email: string;

  @Column('text', {name: 'avatar', nullable: true})
  avatar: string | null;

  @Column('varchar', {name: 'password', length: 60})
  password: string;

  @Column('tinyint', {name: 'is_enabled'})
  isEnabled: boolean;

  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column('datetime', {name: 'deleted_at', nullable: true})
  deletedAt: Date | null;
}
