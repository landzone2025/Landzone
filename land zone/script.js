
document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json") 
        .then(response => response.json())
        .then(data => loadProperties(data))
        .catch(error => console.error("Error loading data:", error));
});

function loadProperties(properties) {
    const propertyList = document.getElementById("property-list");
    
    properties.forEach(property => {
        const card = document.createElement("div");
        card.classList.add("property-card");

        card.innerHTML = `
            <div class="property-image">
                <img src="/img/${property.image}" alt="Property Image">
            </div>
            <div class="property-details">
                <p class="property-price">$${property.price.toLocaleString()}</p>
                <p class="property-info">${property.acres} Acres</p>
                <p class="location">${property.location}</p>
            </div>
        `;

        propertyList.appendChild(card);
    });

}