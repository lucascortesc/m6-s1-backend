import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128 })
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}
