export class ProfessorOutput {

    constructor(professor: any) {
        this.id = professor.id;
        this.nome = professor.nome;
        this.nomeUsuario = professor.nomeUsuario;
        this.tipoUsuario = professor.tipoUsuario;
    }

    id: number;
    nome: string;
    nomeUsuario: string;
    tipoUsuario: string;
}