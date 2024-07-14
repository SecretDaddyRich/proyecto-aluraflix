document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const index = params.get('index');

    const videos = JSON.parse(localStorage.getItem(category)) || [];
    const video = videos[index];

    if (video) {
        document.getElementById('video-title').textContent = video.title;
        document.getElementById('video-player').src = video.url;
        document.getElementById('video-author').textContent = `Autor: ${video.name}`;
        document.getElementById('video-description').textContent = video.description;
    } else {
        document.getElementById('video-title').textContent = "Video no encontrado";
    }
});