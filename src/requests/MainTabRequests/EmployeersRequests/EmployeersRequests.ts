import axios from "axios";
import { getAccessToken } from "../../../store/authToken";
import { refreshToken } from "../../authRequests";
import {Config} from '../../config'

const baseUrl = Config.baseUrl;

const axiosInstance = axios.create({ 
    baseURL: baseUrl,
});

export async function getEmployeers() {

    try{
      const access_token = await getAccessToken();
      const response = await getEmployeersReq(access_token);
      return response.data
    }
    catch{
      const access_token = (await refreshToken()).access_token;
      const response = await getEmployeersReq(access_token);
      return response.data
    }
  }

  export async function getEmployeersReq(access_token: string) {

      const response = await axiosInstance.post('/api/employeers',{}, {headers: { 
        "Content-Type": "application/json",
        'Authorization': "Bearer "+access_token,
      }})
    
      return response;  

  }