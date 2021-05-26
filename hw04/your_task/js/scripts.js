const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = async (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }

}

const getTracks = (term) => {
    console.log(`
        get tracks from spotify based on the search term
        "${term}" and load them into the #tracks section 
        of the DOM...`);

    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}`).then(response => response.json()).then(data => {
        const fiveTracks = data.slice(0, 5);
        console.log(fiveTracks);

        const element = document.querySelector("#tracks");
        element.innerHTML = "";
        if (fiveTracks.length > 0) {
        for (let i = 0; i < fiveTracks.length; i++) {
            const track = fiveTracks[i];
            element.innerHTML += `<section class="track-item preview" data-preview-track="${track.preview_url}">
            <img src="${track.album.image_url}">
            <i class="fas play-track fa-play" aria-hidden="true"></i>
            <div class="label">
                <h3>${track.name}</h3>
                <p>
                    ${track.artist.name}
                </p>
            </div>
        </section>`
        }
    } else {
        element.innerHTML = `<p>No tracks found</p>`
    }

    attachEventHandlers();

    })
};

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);

    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=album&q=${term}`).then(response => response.json()).then(data => {
        const albums = data;
        console.log(albums);

        const element = document.querySelector("#albums");
        element.innerHTML = "";
        if (albums.length > 0) {
        for (let i = 0; i < albums.length; i++) {
            const album = albums[i];
            element.innerHTML += `<section class="album-card" id="${album.id}">
            <div>
                <img src="${album.image_url}">
                <h3>${album.name}</h3>
                <div class="footer">
                    <a href="${album.spotify_url}" target="_blank">
                        view on spotify
                    </a>
                </div>
            </div>
        </section>`
        }
    } else {
        element.innerHTML = `<p>No albums found</p>`
    }
    })
};

const getArtist = (term) => {
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);

    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${term}`)
      .then(response => response.json())
      .then(data => {
        const artist = data.length > 0 ? data[0] : null;

        console.log(artist)
    
        const element = document.querySelector("#artist");
        if (artist != null) {
        element.innerHTML = `<section class="artist-card" id="${artist.id}">
        <div>
            <img src="${artist.image_url}">
            <h3>${artist.name}</h3>
            <div class="footer">
                <a href="${artist.spotify_url}" target="_blank">
                    view on spotify
                </a>
            </div>
        </div>
    </section>`;
        } else {
            element.innerHTML = `<p>No artist found</p>`;
        }
      });

};

const pressTrack = (e) => {
    const element = e.currentTarget;
    console.log(element.innerHTML)

    const trackDiv = document.querySelector("footer > .track-item");
    console.log(trackDiv)
    trackDiv.innerHTML = `${element.innerHTML}`;

    console.log(element.getAttribute('data-preview-track'));
    audioPlayer.setAudioFile(element.getAttribute('data-preview-track'));

    audioPlayer.play();
}

const attachEventHandlers = () => {
    const elements = document.querySelectorAll(".track-item");
    console.log("ELEMENTS")
    console.log(elements)
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', pressTrack);
    }
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};