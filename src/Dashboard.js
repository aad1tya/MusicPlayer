import React from "react";
import "./style.css";
import "./css/all.css";
import "./BScss/bootstrap.min.css";
import $ from "jquery";
import useAuth from './useAuth';
import {useState, useEffect} from "react";

import {Container, Form} from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: "f451d1518d4045b88c3c5d5fba242299",

})


function PlaylistSection({accessToken})
{
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    console.log(searchResults)
    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                const mediumAlbumImage = track.album.images.reduce((smallest, image) => {
                        if (image.height > smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: mediumAlbumImage.url
                }
            }))
        })
        return () => cancel = true
    }, [search, accessToken])
    return (
        <div id = "Playlist">
        <Container className="d-flex flex-column py-2" style={{height:"40vh"}}>
            <Form.Control style={{border: "4px solid red"}} type="search" placeholder="Search songs" value={search} onChange={e => setSearch(e.target.value)} />
            <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
                Music
            </div>
        </Container>
        </div>
    )
}

function Cover()
{
    return (
        <div id="AlbumCover">
        </div>
    )
}

function Recommendations()
{
    return (
        <div id="Recommendations">

        </div>
    )
}

function Controls()
{
    return (
        <div id="Controls">
            <div class="container">
                <button class="button">
                    <span class="play"></span>
                    <span class="small-box"></span>
                </button>
            </div>
        </div>

    )
}

$(function () {
    $(".button").click(function () {
      $(".buttonn").toggleClass("active");  
          $(".play").toggleClass("active");    
      $(".small-box").toggleClass("active");
      if($(".small-box").hasClass("active")) {
        $(".small-box").removeClass("pauseToPlay");
      } else {
        $(".small-box").addClass("pauseToPlay");
      }
      // $(input).addClass("active");
    });
  });

export default function Dashboard({code}){

    const accessToken = useAuth(code)

    useEffect(() =>  {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    return (
        <div className="main">
            <PlaylistSection accessToken={accessToken}/>
            <Cover />
            <Controls />
            <Recommendations />
        </div>
    )
}