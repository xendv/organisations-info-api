import axios from "axios";
import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

export default async function loadData(url,request,callback){
    let response = await axios.post(url, request,  { headers: {'content-type': 'application/json'}})
    .then((response) => {
        if (callback) callback(response.data);
        return response;
    })
    .catch (error => console.error(error));
    return response.data;
}