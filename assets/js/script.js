const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");

let imagesData = [];

// Fetch image data from the JSON file
async function fetchImageData() {
    try {
        const response = await fetch("imageData.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch image data. Status: ${response.status}`);
        }
        imagesData = await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Call this function to fetch image data before using it
fetchImageData();

function searchImages(keyword) {
    // Clear previous search results
    searchResult.innerHTML = "";

    // Filter images based on the labels
    const results = imagesData.filter((imageData) => imageData.labels.some(label => label.toLowerCase().includes(keyword)));

    results.forEach((imageData) => {
        const image = document.createElement("img");
        image.src = imageData.imagePath;

        const imageLink = document.createElement("a");
        imageLink.href = imageData.imagePath;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });
}

function searchByLabel(label) {
    // Highlight the selected label button
    const labelButtons = document.querySelectorAll('.tags');
    labelButtons.forEach(button => button.classList.remove('selected'));

    // Add a class to highlight the selected label
    const selectedButton = document.querySelector(`.tags[data-label='${label}']`);
    selectedButton.classList.add('selected');

    // Perform the search based on the selected label
    searchImages(label);
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchImages(searchBox.value.toLowerCase());
});
