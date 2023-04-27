import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Reports } from "src/reports/reports.entity";


@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    email: string;

    @OneToMany(
        () => Reports,
        (report: Reports) => report.user
    )
    reports: Reports[]

    @Column({
        default: true
    })
    isAdmin: boolean

    @AfterUpdate()
    logUpdate() {
        console.log(`Update users with id ${this.id}`);
    }

    @AfterInsert()
    logInsert() {
        console.log(`Insert users with id ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Remove users with id ${this.id}`);
    }
}