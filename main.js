const form = document.querySelector('form');
const gallery = document.querySelector('.image-container');
const interestSection = document.querySelector('.interest-section');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let query = form.querySelector('input').value;
    form.querySelector('input').value = '';

    if (query == '') {
        query = "nothing";
    }
    tvMazeApi(query);
});

async function tvMazeApi(query) {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const shows = await res.json();
    makeImages(shows);
}

function makeImages(shows) {
    gallery.innerHTML = ''; // Clear previous images
    for (let show of shows) {
        if (show.show.image) {
            const imgContainer = document.createElement('div');
            const img = document.createElement('img');
            const interestBtn = document.createElement('button');
            const notInterestBtn = document.createElement('button');

            img.src = show.show.image.medium;
            interestBtn.textContent = 'Interest';
            notInterestBtn.textContent = 'Not interest';

            interestBtn.addEventListener('click', () => {
                moveToInterestSection(imgContainer);
            });

            notInterestBtn.addEventListener('click', () => {
                removeFromGallery(imgContainer);
            });

            imgContainer.classList.add('image-container-item'); // Add class for styling
            imgContainer.appendChild(img);
            imgContainer.appendChild(interestBtn);
            imgContainer.appendChild(notInterestBtn);
            gallery.appendChild(imgContainer);
        }
    }
}

function moveToInterestSection(imgContainer) {
    const likedImgContainer = imgContainer.cloneNode(true);
    const interestBtn = likedImgContainer.querySelector('button:first-of-type');
    interestBtn.remove();
    const notInterestBtn = likedImgContainer.querySelector('button');
    notInterestBtn.addEventListener('click', () => {
        likedImgContainer.remove();
    });
    likedImgContainer.classList.add('image-container-item'); 
    interestSection.appendChild(likedImgContainer);
    imgContainer.remove();
}

function removeFromGallery(imgContainer) {
    imgContainer.remove();
}
