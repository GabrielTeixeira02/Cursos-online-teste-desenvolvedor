import { AlunoCursoOutput } from "./aluno-curso-output";

export class CursoOutput {

    constructor(curso: any) {
        this.nomeCurso = curso.nome;
        curso.AlunoCurso.forEach(a => {
            this.alunos.push(new AlunoCursoOutput(a.aluno.nome, a.status))
        })
    }

    nomeCurso: string;
    alunos: AlunoCursoOutput[] = [];

}