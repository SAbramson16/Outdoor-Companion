
const clientID = '56ddd98ba28442de945cf3de9a560613';
const clientSecret = 'f7a1ae9077424e308715d22ee18578de';

const spotifyAPI = async function () {
    const result = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    }
    .then()
    );

    const data = await result.json();
    return data.access_token;
};
  

// // Now, you can call the function and use the token
const userToken = await spotifyAPI();
console.log(userToken);



// //genre playlist: return the categories for the genre playlist 
// const getGenre = async (userToken) => {

//     const result = await fetch('https://api.spotify.com/v1/browse/categories', {
//         method: 'GET',
//         headers: {'Authorization': 'Bearer ' + userToken}

//     });

//     const data = await result.json();
//     return data.categories.items;
// };


// //genre ID, return the ID for the specified genre
// const getPlaylistGenre = async (token, genreID) => {
//     const limit = 10;

//     const result = await fetch(`https://api.spotify.com/v1/browse/categories/$(genreID)/playlists?limit=${limit}`, {
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + token
//         }
//     })
//     const data = await result.json()
//     // return data.playlist.items;
//     console.log( data.playlist.items)
// };

// //track - gather the tracks which are located within the specific genre above
// const getTrack = async (token, trackEndPoint) => {
//     const limit = 8

//     const result = await fetch(`$(trackEndPoint)?limit=${limit}`,{
//         method: 'GET', 
//         headers: {'Authorization' : 'Bearer ' + token}
//     });
//     const data = await result.json();
//     return data;
// }
// //return the user token
// // return {
// //     _getUserToken(token) {
// //         return userToken();
// //     },
// //     _getGenre(token) {
// //         return (getGenre)
// //     },
// //     _getPlaylistGenre(token, genreID) {
// //         return getPlaylistGenre(token, genreID)
// //     },
// //     _getTrack(token, trackEndPoint) {
// //         return getTrack(token, trackEndPoint)
// //     },
// // };

// const UserInterface = (function() {

//     //declare objects for selectors 
//     const DOMelement = {
//         selectGenre:'#select_genre',
//         SelectPlaylist:'#select_playlist',
//         SubmitButton:'#submit_btn',
//         SongList:'#song_list',
//         hfToken:'#hidden_token',
//         SongDetail: '#song_detail',
//     }
// //public methods, input, genre, playlist and tracks

//     return{
//         inputfield(){
//             return{
//                 genre: document.querySelector(DOMelement.selectGenre),
//                 playlist: document.querySelector(DOMelement.SelectPlaylist),
//                 track: document.querySelector(DOMelement.SongList),
//                 submit: document.querySelector(DOMelement.SubmitButton),
//                 songDetail: document.querySelector(DOMelement.SongDetail)
//             }
//         },

//         //create list option with methods
//         createGenre(text, value){
//             const html = '<option value = "$(value)">$(text)</option>';
//             document.querySelector(DOMelement.selectGenre).insertAdjacentHTML('beforeend', html);
//         },

//         createPlaylist(text, value){
//             const html = '<option value = "$(value)">$(text)</option>';
//             document.querySelector(DOMelement.SelectPlaylist).insertAdjacentHTML('beforeend', html);
//         },

//         createTrack(id, name){
//             const html = '<a href="#" class= "list-group-item list-grou-item-action list-group-item-light" id="${id}">${name}</a>';
//             document.querySelector(DOMelement.SongList).insertAdjacentHTML('beforeend', html);
//         },

//         //creating the song detail with a method

//         createSongDetail(img, title, artist){
//             const detailDiv = document.querySelector(DOMelement.songDetail);
//             //when user clicks for a new song, this will clear out the detail in the div
//             detailDiv.innerHTML = '';

//             // const html = 
//             // '
//             // <div class = "row col-sm-12 px-0">
//             //     <img src="${img}" alt = "">
//             // </div>
//             // <div class = "row col-sm-12 px-0">
//             //     <label for="Genre" class="form-label" col-sm-12>${title}:</label>
//             // </div>
//             // <div class = "row col-sm-12 px-0">
//             //     <label for="artist" class="form-label" col-sm-12>${artist}:</label>
//             // </div>
//             // ':

//             detailDiv.insertAjdacentHTML('beforeend', html)
//         },
        
//         resetSongDetail(){
//             this.inputfield().songDetail.innerHTML = '';
//         },

//         resetTracks(){
//             this.inputfield().songDetail.innerHTML = '';
//             this.resetSongDetail();
//         },

//         resetPlaylist(){
//             this.inputfield().playlist.innerHTML='';
//             this.resetTracks()
//         }
//     }

// })();

// const AppController = (function(UIcontrol, APIcontrol){
//     const DOMinputs = UIcontrol.Inputfield()

//     //when page loads, get genre's
//     const loadGenres = async () => {
//         const token = await APIcontrol._getUserToken;
//         UIcontrol.storeToken(token)
//         const genres = await APIcontrol.getGenre(token)
//         genres.forEach(element => {UIcontrol.createGenre(element.name, element.id);
//         });
        

//         //event listener for Change
//         DOMinputs.genre.addEventListener('change', async () => {
//             UIcontrol.resetPlaylist();
//             const token = UIcontrol.getStoredToken().token;
//             const genreSelect = UIcontrol.inputfield().genre;
//             const genreID = genreSelect.options[genreSelect.selectedIndex].value;
//             const playlist = await APIcontrol.getPlaylistGenre(token, genreID);
//             console.log(playlist)
//         });

//         //event listener for submit button
//         DOMinputs.SubmitButton.addEventListener('click', async (e) => {
//             e.preventDefault();
//         });

//         DOMinputs.songs.addEventListener('click', async (e) => {
//             e.preventDefault();
//         });


//     };
// })();