// api GIPHY

function onJsonImg(json){
    console.log('json ricevuto');
    console.log(json);
    const results = json.hits;
    const album = document.querySelector('#album');
    album.innerHTML = '';
    if(results.length == 0){
	const errore = document.createElement('h1'); 
	errore.textContent = 'Errore, nessun risultato!' ; 
	album.appendChild(errore);
  }
    else{
    for(const result of results){
	    console.log(result);
        const image = result.webformatURL;
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = image;
        div.appendChild(img);
        album.appendChild(div);

    }
}
}

function onSuccess(response) {
    console.log('Risposta ricevuta');
    return response.json();
 }

function onError(error){
    console.log('Errore: ' + error)
}

function search(event)
{
	event.preventDefault();
	const input = document.querySelector('#content');
    
    const value = encodeURIComponent(input.value);
    if(value !== ''){

    console.log('Sto eseguendo la ricerca di:' + value);
    request = img_endpoint + '?key='  + img_key + '&q=' + value + '&per_page=' + maxResults;
    fetch(request).then(onSuccess, onError).then(onJsonImg);
    }

    else{
            const album = document.querySelector('#album');
            album.innerHTML = '';
            const errore = document.createElement('h1'); 
            errore.textContent = 'Errore, nessun risultato!' ; 
            album.appendChild(errore);
    }
}

const maxResults = 5;
const img_endpoint = 'https://pixabay.com/api/' ;
const img_key = '27098682-177d8dd4c1f1e14ce9427da09';

const form = document.querySelector('#ricerca');
form.addEventListener('submit', search);

const button=document.querySelector('#music');
button.addEventListener('click',Music);

// api spotify


function Music(event){
    
    fetch(playlist_spotify_endpoint,{
            method: 'GET',
            headers:{
                'Authorization' : 'Bearer ' + token
            }
        }
    ).then(onSuccessMusic,onError).then(onJsonMusic);
}

function onSuccessMusic(response){
    return response.json();
}

function onJsonMusic(json){
    console.log("json ricevuto");
    console.log(json);
    const playlist=document.querySelector("#playlist-view");
    playlist.innerHTML=''; 
    const random= Math.floor( Math.random()*46);

    for(let i= 0; i < 5; i++){
        const result=json.tracks.items[random + i];
        const titolo =result.track.name;
        const album_name =result.track.album.name;
        const data_rilascio = result.track.album.release_date;
        const artista=result.track.artists[0].name;
        const img_album=result.track.album.images[0].url;


        const divpadre = document.createElement('div');
        divpadre.classList.add('container');
        const div2 = document.createElement('div');
        const canzone = document.createElement('div');
        
        const img = document.createElement('img');
        img.src = img_album;
        img.classList.add('img_album')
        const title = document.createElement('h1');
        title.textContent = 'Titolo:' + titolo;
        const album = document.createElement('p');
        album.textContent = 'Album:' + album_name;
        const data = document.createElement('p');
        data.textContent = 'Uscita in data: ' + data_rilascio;
        const artist = document.createElement('p');
        artist.textContent = 'Cantante:' + artista;
        
        canzone.appendChild(title);
        canzone.appendChild(album);
        canzone.appendChild(data);
        canzone.appendChild(artist);
        div2.appendChild(canzone);
        divpadre.appendChild(div2);
        divpadre.appendChild(img);
        playlist.appendChild(divpadre);
    }

}

function onTokenSuccess(response) {
    return response.json();
}

function onTokenJson(json) {
     token= json.access_token;
}

const client_id = '5c1c1b2f54194826a994ceeb6205a82c';
const client_secret = 'f0499e4570d3461e8860056c77b2cefb';
let token;
const spotify_endpoint = 'https://accounts.spotify.com/api/token'
const playlist_spotify_endpoint = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbIQnj7RRhdSX';

fetch(spotify_endpoint,
    {
        method:"post",
        body: 'grant_type=client_credentials',
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
        }
    }
).then(onTokenSuccess, onError).then(onTokenJson);




