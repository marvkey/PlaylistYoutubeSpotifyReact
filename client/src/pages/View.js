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
var spotifyImages =[]

export default function View(){

      
    const [spotifyData,setSpotifyData] = useState({})
    const [spotifyAccesToken,setSpotifyAccessToken] = useState('');
    const [spotifyImageser,setSpotifyImages] = useState([]);
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
            //if(spotifyData.items != null ){
            //    spotifyData.items.map((item) => spotifyImages.push(item.images.url))
           // }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const handleGetImages=() =>{
        handleGetPlaylists();
        //if(spotifyImages.items  == null)return;
        //0oRUQemdMM2IPVwmiDHDdJ
        spotifyData.items.map((item) =>
        axios.get("https://api.spotify.com/v1/playlists/"+item.id+"/images",{
          headers: {
            Authorization: "Bearer " + spotifyAccesToken,
          },
        })
        .then((response) => {
          const value = response.data.map((item)=>  item.url)
          spotifyImages.push(value)
          setSpotifyImages([...spotifyImageser,{
            value
          }])
        })
        .catch((error) => {
          console.log(error);
        })
        )
      }
      spotifyImages.map((item)=>console.log("yeah"+item))
    //useEffect(() => {
    //    handleGetPlaylists(); 
    //});
    //if(spotifyData.items != null ){
    // spotifyData.items.map((item) => spotifyImages.push(item.images.url))
    //} 
  //  {spotifyData?.items ? spotifyData.items.map((item) => item.images.map(imag =><img src={imag.url} width={250} height={250} />)) : null}

    return (
      <>
        <button onClick={handleGetImages}>PlaylistGet</button>
        { spotifyImages.map((item) => <p>{item}</p>)}
      <p>{spotifyImages[0]}</p>
      </>
    )
} 