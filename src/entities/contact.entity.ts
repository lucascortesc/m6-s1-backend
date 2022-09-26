import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128 })
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @ManyToOne(() => Client, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "client_id" })
  client: Client;
}
