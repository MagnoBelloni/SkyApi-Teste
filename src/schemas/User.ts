import {
    ObjectID,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
} from 'typeorm';

interface ITelefone {
    numero: string;
    ddd: string;
}

@Entity('users')
class User {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    telefones: ITelefone[];

    @CreateDateColumn()
    data_criacao: Date;

    @UpdateDateColumn()
    data_atualizacao: Date;

    @Column()
    ultimo_login: Date;

    @Column()
    token: string;
}

export default User;
