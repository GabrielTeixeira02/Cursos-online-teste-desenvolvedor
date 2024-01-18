export class ProfessorOutput {

    constructor(professor: any) {
        this.id = professor.id;
        this.nome = professor.nome;
        this.usuario = professor.usuario;
        this.tipoUsuario = professor.tipoUsuario;
    }

    id: number;
    nome: string;
    usuario: string;
    tipoUsuario: string;
}