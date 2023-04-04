import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Entity({ name: 'post' })
@Unique(['id'])
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'title', length: 30 })
  title: string;

  @Column({ type: 'varchar', name: 'contents', length: 100 })
  contents: string;

  @JoinColumn({
    name: 'user_uuid',
    referencedColumnName: 'id',
  })
  @ManyToOne((type) => User, (user) => user.posts)
  user: User;

  @Column({ type: 'boolean', default: false })
  delYn: boolean;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
