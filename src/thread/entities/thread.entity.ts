import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Forum } from '../../forum/entities/forum.entity.js';
import { Users } from '../../user/entities/user.entity.js';

@Entity('threads')
export class Thread {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column('text')
  content: string;

  @Column({ name: 'forum_id' })
  forumId: string;

  @ManyToOne(() => Forum, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'forum_id' })
  forum: Forum;

  @Column({ name: 'author_id', type: 'uuid', nullable: true })
  authorId: string | null;

  @ManyToOne(() => Users, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'author_id' })
  author: Users | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
