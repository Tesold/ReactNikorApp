import axios, { AxiosResponse } from 'axios';
import * as Random from 'expo-random';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { getAccessToken, getRefreshToken, getUser, setAccessToken, setRefreshToken, setUser } from '../store/authToken';
import { Config } from './config';
import { store } from '../../redux/store';

const baseUrl = Config.baseUrl;

const axiosInstance = axios.create({ 
    baseURL: baseUrl,
});

export async function getSalt(Nickname:string)
{
    const salt = await axiosInstance.post(`/auth/salt`, {Nickname}, {headers: { 
      "Content-Type": "application/json",
    }
  });
   // console.log("Salt: "+salt.data);
    return salt.data;
}

export async function genSalt()
{
  const response = await axiosInstance.get('/auth/gensalt');
  return response.data
}

export async function refreshToken()
{
  const Nickname = (await getUser()).Nickname;
  const refresh_token = await getRefreshToken();

  const response = (await axiosInstance.post('/auth/refresh', {
    Nickname: Nickname,
    refresh_token: refresh_token
  }))

  console.log("RefreshToken");

  await setAccessToken(response.data.access_token);
  await setRefreshToken(response.data.refresh_token);



  return response.data;
}

export async function LogIn(Nickname:string, Password:string)
{
    const Salt = await getSalt(Nickname);
    //console.log(Salt);
    const PasswordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Password+Salt
    );
      

    const response = await axiosInstance.post(`/auth/login`, {
        username:Nickname,
        password:PasswordHash,
      }, {headers: { 
        "Content-Type": "application/json",
      }
    });

      if(response.status===201)
      {
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);
        setUser(response.data.payload)
        return {status: response.status, access_token: response.data.access_token, payload: response.data.payload}
      }

      return {status:response.status, access_token: ''};
}

export async function Registration(userData:any)
{
    const regex = new RegExp('/', 'gi');

    const Salt = await genSalt();
    const PasswordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      userData.Password+Salt
    );
    
    delete userData.Password;
    userData.Birthday = userData.Birthday.replace(regex, '.');

    let access_token = await getAccessToken();

    axiosInstance.post('users/registration', {...userData, PasswordHash, Salt},
      {headers: { 
        "Content-Type": "application/json",
        Authorization: "Bearer "+access_token,
      }
    }).then(res => {
      console.log(res);
      console.log(res.data)
  }).catch(async error => {
    access_token = (await refreshToken()).access_token;
    
    const response = await axiosInstance.post('users/registration', {...userData, PasswordHash, Salt},
      {headers: { 
        "Content-Type": "application/json",
        Authorization: "Bearer "+access_token,
      }
    })
  });  
}

const toHexString = (bytes:Uint8Array) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');