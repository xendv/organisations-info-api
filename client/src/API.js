import axios from "axios";
import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

export default function loadData(url,request,callback){
    axios.post(url, request)
    .then((response) => {
        callback(response.data);
    })
    .catch (error => console.error(error));
}