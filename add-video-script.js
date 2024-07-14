document.addEventListener('DOMContentLoaded', function() {
    const addGenreBtn = document.getElementById('add-genre-btn');
    const saveGenreBtn = document.getElementById('save-genre-btn');
    const newGenreContainer = document.getElementById('new-genre-container');
    const newGenreInput = document.getElementById('new-genre');
    const videoCategorySelect = document.getElementById('video-category');
    const clearFormBtn = document.getElementById('clear-form-btn');
    const deleteGenreBtn = document.getElementById('delete-genre-btn');
    const deleteGenreContainer = document.getElementById('delete-genre-container');
    const deleteGenreSelect = document.getElementById('delete-genre');
    const confirmDeleteGenreBtn = document.getElementById('confirm-delete-genre-btn');

    function loadCategories() {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            videoCategorySelect.appendChild(option);
            deleteGenreSelect.appendChild(option.cloneNode(true));
        });
    }

    addGenreBtn.addEventListener('click', () => {
        newGenreContainer.style.display = 'block';
    });

    saveGenreBtn.addEventListener('click', () => {
        const newGenre = newGenreInput.value.trim();
        if (newGenre) {
            let categories = JSON.parse(localStorage.getItem('categories')) || [];
            if (!categories.includes(newGenre)) {
                categories.push(newGenre);
                localStorage.setItem('categories', JSON.stringify(categories));
                const option = document.createElement('option');
                option.value = newGenre;
                option.textContent = newGenre;
                videoCategorySelect.appendChild(option);
                deleteGenreSelect.appendChild(option.cloneNode(true));
                newGenreInput.value = '';
                newGenreContainer.style.display = 'none';
            } else {
                alert('La categoría ya existe.');
            }
        }
    });

    clearFormBtn.addEventListener('click', () => {
        document.getElementById('video-name').value = '';
        document.getElementById('video-title').value = '';
        document.getElementById('video-description').value = '';
        document.getElementById('video-url').value = '';
        document.getElementById('video-image-url').value = '';
        document.getElementById('video-category').value = '';
    });

    deleteGenreBtn.addEventListener('click', () => {
        deleteGenreContainer.style.display = 'block';
    });

    confirmDeleteGenreBtn.addEventListener('click', () => {
        const categoryToDelete = deleteGenreSelect.value;
        let categories = JSON.parse(localStorage.getItem('categories')) || [];
        categories = categories.filter(category => category !== categoryToDelete);
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.removeItem(categoryToDelete);
        alert('Categoría eliminada exitosamente!');
        location.reload();
    });

    document.getElementById('add-video-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('video-name').value;
        const title = document.getElementById('video-title').value;
        const description = document.getElementById('video-description').value;
        const url = document.getElementById('video-url').value;
        const imageUrl = document.getElementById('video-image-url').value;
        const category = document.getElementById('video-category').value;
    
        const video = { name, title, description, url, imageUrl };
        let videos = JSON.parse(localStorage.getItem(category)) || [];
        videos.push(video);
        localStorage.setItem(category, JSON.stringify(videos));
        alert('Video agregado exitosamente!');
        window.location.href = 'index.html';
    });
    
    loadCategories(); // Cargar categorías después de definir todas las funciones y eventos
});