import "./Home.css"
import React, { useState,Component,useEffect } from 'react';


export default function View(){

    const getReturnedParamsFromSpotifyAuth = (hash) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&");
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
          console.log(currentValue);
          const [key, value] = currentValue.split("=");
          accumulater[key] = value;
          return accumulater;
        }, {});
      
        return paramsSplitUp;
      };
    useEffect(() => {
        if (window.location.hash) {
          const { access_token, expires_in, token_type } =
            getReturnedParamsFromSpotifyAuth(window.location.hash);
    
          localStorage.clear();
    
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("tokenType", token_type);
          localStorage.setItem("expiresIn", expires_in);
        }
      });
    return (
      <>
        SPOTIFY
      </>
    )
}