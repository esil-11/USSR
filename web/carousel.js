document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const folder = carousel.dataset.folder;
        let currentImageIndex = 1;
        const extensions = ['jpg', 'jpeg', 'png', 'gif'];

        const loadImage = (index) => {
            const checkExtensions = extensions.map(ext => fetch(`${folder}/${index}.${ext}`, { method: 'HEAD' })
                .then(response => response.ok ? `${folder}/${index}.${ext}` : null)
                .catch(() => null));

            return Promise.all(checkExtensions).then(results => results.find(result => result !== null));
        };

        const updateImage = () => {
            loadImage(currentImageIndex).then(imageUrl => {
                if (imageUrl) {
                    carousel.querySelector('.carousel-image').src = imageUrl;
                } else {
                    currentImageIndex = 1;
                    loadImage(currentImageIndex).then(firstImageUrl => {
                        if (firstImageUrl) {
                            carousel.querySelector('.carousel-image').src = firstImageUrl;
                        }
                    });
                }
            });
        };

        updateImage();

        carousel.querySelector('.carousel-image').addEventListener('click', () => {
            currentImageIndex++;
            updateImage();
        });
    });
});

