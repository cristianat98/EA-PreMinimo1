import { Student } from './student';

export interface Subject {
    name: string;
    students: Array<Student>;
}
