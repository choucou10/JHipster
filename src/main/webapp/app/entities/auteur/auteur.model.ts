import { Livre } from '../livre';
export class Auteur {
    constructor(
        public id?: number,
        public nom?: string,
        public dateNaissance?: any,
        public livre?: Livre,
    ) { }
}
