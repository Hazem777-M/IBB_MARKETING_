
document.getElementById("review-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get values from the form
    const name = document.getElementById("name").value;
    const reviewText = document.getElementById("review").value;
    const rating = document.getElementById("rating").value;

    // Handle avatar image
    const avatarInput = document.getElementById("avatar");
    let avatarUrl = "https://via.placeholder.com/80"; // Default avatar if none provided
    if (avatarInput.files && avatarInput.files[0]) {
        const file = avatarInput.files[0];
        const reader = new FileReader();
        
        // Convert image to Base64 and store the review
        reader.onloadend = function () {
            avatarUrl = reader.result; // The image as Base64 string

            // Create a new review object
            const reviewData = {
                name: name,
                reviewText: reviewText,
                rating: rating,
                avatarUrl: avatarUrl
            };

            // Save review to localStorage
            let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
            reviews.push(reviewData); // Add the new review
            localStorage.setItem("reviews", JSON.stringify(reviews)); // Save updated reviews array to localStorage

            // Create a new review element and append it to the page
            displayReview(reviewData);

            // Clear the form fields
            document.getElementById("review-form").reset();
        };
        
        // Read the file as a DataURL (Base64)
        reader.readAsDataURL(file);
    } else {
        // If no image is selected, store the default avatar
        const reviewData = {
            name: name,
            reviewText: reviewText,
            rating: rating,
            avatarUrl: avatarUrl
        };

        // Save review to localStorage
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(reviewData);
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Display the review
        displayReview(reviewData);

        // Clear the form fields
        document.getElementById("review-form").reset();
    }
});

// Function to display review
function displayReview(reviewData) {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");

    reviewElement.innerHTML = `
        <div class="review-header">
            <img src="${reviewData.avatarUrl}" alt="${reviewData.name}'s Picture" class="review-avatar">
            <div>
                <p class="review-author">${reviewData.name}</p>
                <p class="review-description">${reviewData.reviewText}</p>
            </div>
        </div>
        <div class="rating">${"⭐".repeat(reviewData.rating)}</div>
    `;

    document.querySelector(".reviews-container").appendChild(reviewElement);
}

// Load stored reviews when the page loads
window.addEventListener("load", function() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.forEach(displayReview);
});
