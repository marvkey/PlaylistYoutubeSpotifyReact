import React, { useState,Component,useEffect } from 'react';
import "./Home.css"
export default function Home(){
    const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
    const REDIRECT_URL_AFTER_LOGIN ="http://localhost:3000/view"
    // what we want from user
    const SCOPES = [
        "user-read-currently-playing",
        "user-read-playback-state",
        "playlist-read-private",
      ];
    const SPACE_DELIMITER = "%20";
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };
    
    return(
      <div className="login">
        <div align="center">
            <div className="Spotify Login">
            <button onClick={handleLogin}>login to spotify</button>
           
            </div>
        </div>
    </div>
    );
}