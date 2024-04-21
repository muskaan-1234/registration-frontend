import {privateReq, publicReq} from "./axios-config"

const batchmasterService=(data)=>{
   return publicReq.post("/batch/batchmas",data);
}

const getbatchesService=(data)=>{
   return publicReq.post("/batch/batchman",data);
}

const deletebatchService=(data)=>{
   return publicReq.post("/batch/deletebatch",data);
}

const saveService=(data)=>{
   return publicReq.post("/register/doSave",data);
}

const editbatchesService=(data)=>{
   return publicReq.post("/batch/updatebatch",data);
}

const getbatchdetailsbytech = (data) => {
   return publicReq.post("/register/getbatchbytech", data);
 };
 

export {batchmasterService,getbatchesService,deletebatchService,saveService,editbatchesService,getbatchdetailsbytech};