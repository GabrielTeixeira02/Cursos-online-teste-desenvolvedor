import { StatusCurso } from "@prisma/client";

export class CursoAcessoUpdateInput {
    constructor(status: StatusCurso) {
        this.status = status;
    }

    status: StatusCurso;
}