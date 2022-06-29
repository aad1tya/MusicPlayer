import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import "./css/all.css"

function PlaylistSection()
{
    return (
        <div id = "Playlist">
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
            <button class="play-btn" ></button>
        </div>
    )
}

function App()
{
    return (
        <div>
            <PlaylistSection />
            <Cover />
            <Controls />
            <Recommendations />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector("#root"));