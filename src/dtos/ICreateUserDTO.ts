interface ITelefone {
    numero: string;
    ddd: string;
}

export default interface ICreateUserDTO {
    nome: string;
    email: string;
    senha: string;
    telefones: ITelefone[];
    token: string;
    ultimo_login: Date;
}
