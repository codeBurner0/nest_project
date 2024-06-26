import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;

    @Column()
    email:string;

    @Column({ default: 'user' })
    role: string;
    
}
