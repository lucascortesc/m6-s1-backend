import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("users")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128 })
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;
}
