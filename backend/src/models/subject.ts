import mongoose, { Schema, Document} from 'mongoose';
import Student, { IStudent } from './student';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const subjectSchema = new Schema({
    name: {
        type: String
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: Student
    }]
});

//Interfaz para tratar respuesta como documento
export interface ISubject extends Document {
    name: string;
    students: IStudent['_id']; //Relacion con la coleccion students
}

//Exportamos modelo para poder usarlo
export default mongoose.model<ISubject>('Subject', subjectSchema);