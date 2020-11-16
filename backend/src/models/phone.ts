import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const phoneSchema = new Schema({
    key: {
        type: String
    },
    value: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IPhone extends Document {
    key: string;
    value: string;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IPhone>('Phone', phoneSchema);