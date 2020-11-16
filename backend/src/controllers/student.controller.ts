import { Request, Response} from "express";
import Student from "../models/student"
import {IPhone} from "../models/phone"

function getStudents (req:Request, res:Response): void {
    Student.find({}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
};

function getStudent(req:Request, res:Response): void {
    Student.find({"_id":req.params.id}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function newStudent (req: Request, res: Response): void {
    const student = new Student({
        "name": req.body.name,
        "address": req.body.address,
        "phones": req.body.phones
    });
    console.log("El nombre es",req.body.name);
    console.log(req.body);
    student.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

//FUNCIONES ADDICIONALES
function updateStudent (req: Request, res: Response){
    const id: string = req.params.id;
    const name: string = req.body.name;
    const address: string = req.body.address;
    const phones: IPhone[] = req.body.phones;
    Student.update({"_id": id}, {$set: {"name": name, "address": address, "phones": phones}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

function deleteStudent (req:Request,res:Response){
    Student.deleteOne({"_id":req.params.id}).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

export default { getStudents, getStudent, newStudent, updateStudent, deleteStudent };