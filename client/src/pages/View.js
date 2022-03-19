import "./Home.css"
import React, { useState,Component,useEffect } from 'react';
import axios from 'axios';
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
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
export default function View(){

      
    const [spotifyData,setSpotifyData] = useState({})
    const [spotifyAccesToken,setSpotifyAccessToken] = useState('');
    var spotifyImages =[]
    useEffect(() => {
        if (window.location.hash) {
          const { access_token, expires_in, token_type } =
            getReturnedParamsFromSpotifyAuth(window.location.hash);
          localStorage.clear();
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("tokenType", token_type);
          localStorage.setItem("expiresIn", expires_in);
          setSpotifyAccessToken(access_token)
        }
      });

      const handleGetPlaylists = () => {
        axios
          .get(PLAYLISTS_ENDPOINT, {
            headers: {
              Authorization: "Bearer " + spotifyAccesToken,
            },
          })
          .then((response) => {
            setSpotifyData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    //useEffect(() => {
    //    handleGetPlaylists(); 
    //});
    //if(spotifyData.items != null ){
    // spotifyData.items.map((item) => spotifyImages.push(item.images.url))
    //} 
    return (
      <>
      <button onClick={handleGetPlaylists}>PlaylistGet</button>
       {spotifyData?.items ? spotifyData.items.map((item) => <p>{item.name}</p>) : null}
      </>
    )
} 