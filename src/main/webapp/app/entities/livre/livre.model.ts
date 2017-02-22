import { Auteur } from '../auteur';
export class Livre {
    constructor(
        public id?: number,
        public titre?: string,
        public description?: string,
        public datePublication?: any,
        public prix?: number,
        public auteur?: Auteur,
    ) { }
}
