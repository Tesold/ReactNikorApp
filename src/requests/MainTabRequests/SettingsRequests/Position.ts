import axios from "axios";
import { getAccessToken, getUser } from "../../../store/authToken";
import { refreshToken } from "../../authRequests";
import {Config} from '../../config'
import { UserDto } from "../../dto/user.dto";

const baseUrl = Config.baseUrl;

const axiosInstance = axios.create({ 
    baseURL: baseUrl,
});

export async function addPosition(PositionNameID:number, PositionCode:string) {

  try{
    console.log(PositionNameID, PositionCode)
    const response = await axiosInstance.post('/positions/create/position',{PositionNameID, PositionCode}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.status
  }
  catch{
    console.log(PositionNameID, PositionCode)
    const response = await axiosInstance.post('/positions/create/position',{PositionNameID, PositionCode}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.status
  }
}

export async function deletePosition(ID: number) {

  try{
    const response = await axiosInstance.post('/positions/delete/position',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.status
  }
  catch{
    const response = await axiosInstance.post('/positions/delete/position',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.status
  }
}


export async function getPositionNamePosition(ID: number) {

  try{
    const response = await axiosInstance.post('/positions/get/positionnamepositions',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.data
  }
  catch{
    const response = await axiosInstance.post('/positions/get/positionnamepositions',{ID}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data
  }
}

export async function getAllPositions() {

  try{
    const response = await axiosInstance.post('/positions/get/allpositions',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+getAccessToken(),
    }})

    return response.data
  }
  catch{
    const response = await axiosInstance.post('/positions/get/allpositions',{}, {headers: { 
      "Content-Type": "application/json",
      'Authorization': "Bearer "+(await refreshToken()).access_token,
    }})

    return response.data
  }
}