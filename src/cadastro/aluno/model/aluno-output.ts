export class AlunoOutput {

    constructor(aluno: any) {
        console.log(aluno)
        this.id = aluno.id;
        this.nome = aluno.nome;
        this.usuario = aluno.usuario;
    }

    id: number;
    nome: string;
    usuario: string;
}