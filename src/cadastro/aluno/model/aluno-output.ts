export class AlunoOutput {

    constructor(aluno: any) {
        this.id = aluno.id;
        this.nome = aluno.nome;
        this.usuario = aluno.nomeUsuario;
    }

    id: number;
    nome: string;
    usuario: string;
}