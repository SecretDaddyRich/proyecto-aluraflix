document.addEventListener('DOMContentLoaded', function() {
    loadVideos();

    function loadVideos() {
        let categories = JSON.parse(localStorage.getItem('categories')) || [];
        categories.forEach(category => {
            if (!document.getElementById(category)) {
                const section = document.createElement('div');
                section.id = category;
                section.className = 'category';
                section.innerHTML = `<h2>${category}</h2><div class="videos horizontal-scroll"></div>`;
                document.getElementById('video-categories').appendChild(section);
            }

            const videos = JSON.parse(localStorage.getItem(category)) || [];
            const videoList = document.getElementById(category).querySelector('.videos');
            videoList.innerHTML = ''; // Clear the current list
            videos.forEach((video, index) => {
                const videoElement = document.createElement('div');
                videoElement.className = 'card';
                videoElement.innerHTML = `
                    <a href="video-detail.html?category=${category}&index=${index}">
                        <img src="${video.imageUrl}" alt="${video.title}" class="card-img">
                    </a>
                    <div class="card-content">
                        <h3 class="card-title">${video.title}</h3>
                        <div class="card-actions">
                            <img src="imagenes/edit-icon.png" alt="Editar" onclick="openEditModal('${category}', ${index})" class="icon">
                            <img src="imagenes/delete-icon.png" alt="Eliminar" onclick="deleteVideo('${category}', ${index})" class="icon">
                        </div>
                    </div>
                `;
                videoList.appendChild(videoElement);
            });

            startAutoScroll(videoList);
        });
    }

    document.getElementById('search-video').addEventListener('input', function() {
        searchVideos();
    });

    function searchVideos() {
        const searchTerm = document.getElementById('search-video').value.toLowerCase();
        const videos = document.querySelectorAll('#video-categories .videos .card');
        videos.forEach(video => {
            const title = video.querySelector('.card-title').textContent.toLowerCase();
            video.style.display = title.includes(searchTerm) ? '' : 'none';
        });
    }

    function startAutoScroll(element) {
        const scrollStep = 2;
        const scrollInterval = 30; // Milisegundos entre cada desplazamiento
        let isHovering = false;
        let scrollIntervalId;

        function scroll() {
            if (!isHovering) {
                if (element.scrollLeft + element.clientWidth >= element.scrollWidth) {
                    element.scrollLeft = 0;
                } else {
                    element.scrollLeft += scrollStep;
                }
            }
        }

        scrollIntervalId = setInterval(scroll, scrollInterval);

        element.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('card') || e.target.closest('.card')) {
                isHovering = true;
            }
        });

        element.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('card') || e.target.closest('.card')) {
                isHovering = false;
            }
        });
    }
});

function openEditModal(category, index) {
    const videos = JSON.parse(localStorage.getItem(category)) || [];
    const video = videos[index];

    // Cargar categorías dinámicamente
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const editCategorySelect = document.getElementById('edit-video-category');
    editCategorySelect.innerHTML = '';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        editCategorySelect.appendChild(option);
    });

    document.getElementById('edit-video-name').value = video.name;
    document.getElementById('edit-video-title').value = video.title;
    document.getElementById('edit-video-description').value = video.description;
    document.getElementById('edit-video-url').value = video.url;
    document.getElementById('edit-video-image-url').value = video.imageUrl;
    document.getElementById('edit-video-category').value = category;
    document.getElementById('edit-video-form').onsubmit = function(event) {
        event.preventDefault();
        video.name = document.getElementById('edit-video-name').value;
        video.title = document.getElementById('edit-video-title').value;
        video.description = document.getElementById('edit-video-description').value;
        video.url = document.getElementById('edit-video-url').value;
        video.imageUrl = document.getElementById('edit-video-image-url').value;
        const newCategory = document.getElementById('edit-video-category').value;

        if (newCategory !== category) {
            let newCategoryVideos = JSON.parse(localStorage.getItem(newCategory)) || [];
            newCategoryVideos.push(video);
            localStorage.setItem(newCategory, JSON.stringify(newCategoryVideos));
            let oldCategoryVideos = JSON.parse(localStorage.getItem(category));
            oldCategoryVideos.splice(index, 1);
            localStorage.setItem(category, JSON.stringify(oldCategoryVideos));
        } else {
            videos[index] = video;
            localStorage.setItem(category, JSON.stringify(videos));
        }

        closeEditModal();
        location.reload();
    };
    document.getElementById('modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('modal').style.display = 'none';
}

function deleteVideo(category, index) {
    let videos = JSON.parse(localStorage.getItem(category)) || [];
    videos.splice(index, 1);
    localStorage.setItem(category, JSON.stringify(videos));
    location.reload();
}

document.querySelector('.close').addEventListener('click', closeEditModal);

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};