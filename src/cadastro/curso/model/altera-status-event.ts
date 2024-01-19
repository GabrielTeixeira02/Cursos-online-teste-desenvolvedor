export class AlteraStatusEvent {

    constructor(idAluno: bigint, idAula: bigint) {
        this.idAluno = idAluno;
        this.idAula = idAula;
    }

    idAluno: bigint
    idAula: bigint
}