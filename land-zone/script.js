document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json") 
        .then(response => response.json())
        .then(data => loadProperties(data))
        .catch(error => console.error("Error loading data:", error));
});

function loadProperties(properties) {
    const propertyList = document.getElementById("property-list");
    
    properties.forEach((property, index) => {
        const card = document.createElement("div");
        card.classList.add("property-card");

        const images = property.image; // expect array like ["1.jpg", "2.jpg"]
        const folderName = property.folderName;
        const firstImage = images[0];

        card.innerHTML = `
            <div class="property-image">
                <div class="carousel" id="carousel-${index}">
                    <button class="carousel-btn left" onclick="prevImage(${index})">❮</button>
                    <img src="/img/${folderName}${firstImage}" alt="Property Image" id="carousel-image-${index}">
                    <button class="carousel-btn right" onclick="nextImage(${index})">❯</button>
                </div>
            </div>
            <div class="property-details">
                <p class="property-price">$${property.price.toLocaleString()} </p><a href="${property.youtube}"><i class="fa fa-youtube-play" style="font-size:28px;color:red;"></i></a>
                <p class="property-info">${property.acres} კვ.მ</p>
                <p class="location">${property.location}</p>
               
            </div>
        `;

        // Store images and index in a global map
        carouselData[index] = {
            images: images,
            foldername: folderName,
            currentIndex: 0
        };

        propertyList.appendChild(card);
    });
}

// Global object to track carousel state for each card
const carouselData = {};

function updateCarouselImage(cardIndex) {
    const data = carouselData[cardIndex];
    const folderName = data.foldername;
    const imgElement = document.getElementById(`carousel-image-${cardIndex}`);
    imgElement.src = `/img/${folderName}${data.images[data.currentIndex]}`;
}

function nextImage(cardIndex) {
    const data = carouselData[cardIndex];
    data.currentIndex = (data.currentIndex + 1) % data.images.length;
    updateCarouselImage(cardIndex);
}

function prevImage(cardIndex) {
    const data = carouselData[cardIndex];
    data.currentIndex = (data.currentIndex - 1 + data.images.length) % data.images.length;
    updateCarouselImage(cardIndex);
}

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const textElement = document.querySelector('.texttext1');
    
    const isActive = navbar.classList.toggle('active');
    console.log(textElement)
    if (isActive) {
        textElement.classList.add('possiotionText');
    } else {
        textElement.classList.remove('possiotionText');
    }
}

   

