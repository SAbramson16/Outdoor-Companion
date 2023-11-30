
let playlists = {
    Happy: ['1700550624'],
    Sad: ['300494469'],
    Mood3: ['748670643'],
    Mood4: ['265438402'],
    Mood5: ['1074641335'],
   
  };

  // Get the container where you want to display the playlists
  let playlistContainer = document.getElementById('playlistContainer');

  function loadPlaylist() {
    // Get the selected mood
    let moodSelect = document.getElementById('moodSelect');
    let selectedMood = moodSelect.value;

    // Clear previous playlist content
    playlistContainer.innerHTML = '';

    // Check if a mood is selected
    if (selectedMood) {
      // Create an iframe element for each playlist
      playlists[selectedMood].forEach(function (playlistId) {
        let playlistGenre = document.createElement('iframe');
        playlistGenre.setAttribute('width', '100%');
        playlistGenre.setAttribute('height', '300');
        playlistGenre.setAttribute('scrolling', 'no');
        playlistGenre.setAttribute('frameborder', 'no');
        playlistGenre.setAttribute('src', 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + playlistId + '&color=%23ff5500&auto_play=false&hide_related=false&amp;');
        playlistContainer.appendChild(playlistGenre);
      });
    }
  }