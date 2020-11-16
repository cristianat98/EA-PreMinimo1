import { Request, Response } from "express";
import Subject from "../models/subject"

function getSubjects (req:Request, res:Response): void {
    Subject.find({}).populate('subjects').then((data)=>{
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
    Subject.find({"nombre":req.params.nombre}).populate('subjects').then((data)=>{
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

export default { getSubjects, getSubject, addSubject };