import type { Request, Response } from "express";
import { studentServices } from "./student.service.js";


const createStudent = async(req:Request,res:Response)=>{

try{
    //get user req and data

const student = req.body

//will call service  fun to send this data
const result = await studentServices.createStudentIntoDB(student);


// send res

res.status(200).json({
  success:true,
  message:"student is created successfully !",
  data:result

})
}catch(error){
    console.log(error)
 res.status(500).json({
  success:false,
  message:"student is not created successfully !",
  data:error

})
}

}

export const studentControllers = {
    createStudent
}