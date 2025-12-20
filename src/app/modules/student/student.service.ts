import type { TStudent } from './student.interface.js';
import { Student } from './student.model.js';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(studentData); built in static method

  const student = new Student(studentData); //create instance
  if( await student.isUserExists(studentData.id)){
    throw new Error('User already exist')
  }
  const result = await student.save(); // built in instance method
  return result;
};

const getAllStudentFromDB = async()=>{
    const result = await Student.find();
    return result;
}
const getSingleStudentFromDB = async(id:string)=>{
    const result = await Student.findOne({id});
    return result;
}

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
