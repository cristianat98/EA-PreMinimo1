import { Request, Response } from "express";
import Student from "../models/student"
import Subject from "../models/subject"

function getSubjects (req:Request, res:Response): void {
    Subject.find({}).populate('students').then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
};

function getSubject(req:Request, res:Response): void {
    Subject.find({"_id":req.params.id}).populate('students').then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function addSubject (req: Request, res: Response): void {
    const subject = new Subject({
        "name": req.body.name,
    });
    console.log("El nombre es",req.body.name);
    console.log(req.body);
    subject.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

async function addStudent (req: Request, res: Response) {
    const student = await Student.findOne({"_id": req.params.idStudent});

    if(student){
        Subject.updateOne({"_id": req.params.id}, {$addToSet: {students: student?._id}}).then(data => { 
            if (data.nModified == 1) { 
                console.log("Student added successfully"); 
                return res.status(201).send({message: 'Student added successfully'}); 
            } else { 
                return res.status(409).json('Student already exists!!!') 
        } }).catch((err) => { 
            console.log("error ", err); 
            return res.status(500).json(err); 
        }); 
    }
    else{
        return res.status(404).send({message: 'Student not found'}); 
    }
}

export default { getSubjects, getSubject, addSubject, addStudent };