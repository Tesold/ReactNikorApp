import axios from "axios";
import { getAccessToken } from "../../../store/authToken";
import { refreshToken } from "../../authRequests";
import {Config} from '../../config'

const baseUrl = Config.baseUrl;

const axiosInstance = axios.create({ 
    baseURL: baseUrl,
});

export async function addPositionName(DepartmentID:number, PositionName:string) {

  try{
    console.log(DepartmentID, PositionName)
    const response = await axiosInstance.post('/positions/create/positionname',{DepartmentID, PositionName: PositionName}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.status
  }
  catch{
    const response = await axiosInstance.post('/positions/create/positionname',{DepartmentID, PositionName: PositionName}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.status
  }
}

export async function getPositionNames() {

  try{
    const response = await axiosInstance.post('/positions/get/positionnames',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.data
  }
  catch{
    const response = await axiosInstance.post('/positions/get/positionnames',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data
  }
}

export async function getAllPositionNames() {

  try{
    const response = await axiosInstance.post('/positions/get/allpositionnames',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.data
  }
  catch{
    const response = await axiosInstance.post('/positions/get/allpositionnames',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data
  }
}

export async function deletePositionName(ID: number) {

  try{
    const response = await axiosInstance.post('/positions/delete/positionname',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.status
  }
  catch{
    const response = await axiosInstance.post('/positions/delete/positionname',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.status
  }
}