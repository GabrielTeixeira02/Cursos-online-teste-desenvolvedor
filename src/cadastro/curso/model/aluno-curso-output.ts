export class AlunoCursoOutput {

    constructor(nomeAluno: string, statusCurso: string) {
        this.nomeAluno = nomeAluno;
        this.statusCurso = statusCurso;
    }

    nomeAluno: string;
    statusCurso: string;
}