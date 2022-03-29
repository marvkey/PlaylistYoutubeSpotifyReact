import "./Home.css"
import React, { useState,Component,useEffect } from 'react';
import axios from 'axios';
import Playlist from './playlist.js';
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

export async function getYoutubeServerSideProps(){
  const res = await fetch('${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}')
  const data = await res.json();
  return {
    props:{
      data
    }
  }
}
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
let spotifyPlaylist=[];
let youtubePlaylist =[];
export default function View(){
    const [spotifyData,setSpotifyData] = useState({})
    const [spotifyAccesToken,setSpotifyAccessToken] = useState('');
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
      let data =getYoutubeServerSideProps();
      console.log(data);
      const handleGetImages=() =>{
        handleGetPlaylists();
       
        if(spotifyData.item === null)return;
        spotifyPlaylist =[]
        spotifyData.items.map((item) =>
        axios.get("https://api.spotify.com/v1/playlists/"+item.id+"/images",{
          headers: {
            Authorization: "Bearer " + spotifyAccesToken,
          },
        })
        .then((response) => {
          let data;
            for(const element of response.data.reverse()){
            data =""
            data = element.url;
            console.log(element.url)
          };
          console.log("ID: ",item.id);
          console.log(item.name+" "+data);
          spotifyPlaylist.push({name:item.name,data: data});
        })
        .catch((error) => {
          console.log(error);
        })
        )
      }
   
    return (
      <>
      <button onClick={handleGetImages}>Spotify playlist</button>
      {spotifyPlaylist.map(item =>(
        <div>
          <p>{item.name}</p>
          <img src={item.data} width={200} height={200}/>
        </div>
        )
      )}
      </>
    )
} 