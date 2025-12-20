import type { Student } from "./student.interface.js";
import { StudentModel } from "./student.model.js";

 const createStudentIntoDB =async (student:Student)=>{

  const result =  await StudentModel.create(student);
  return result ;
}

export const studentServices = {
    createStudentIntoDB,
}