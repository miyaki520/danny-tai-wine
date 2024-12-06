fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const contentDiv = document.getElementById("burg-life-block-content");

    const rowDiv = document.createElement("div");
    rowDiv.className = "row justify-content-center";

    data.forEach((item) => {
      // Create a column div for each card
      const colDiv = document.createElement("div");
      colDiv.className = "col-md-6 col-lg-6 col-12 text-center";

      // Create the card structure
      const cardHtml = `
        <div class="card border-0">
          <img src="${item.image}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title century-gothic-bold text-burgundy">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <div class="d-flex gap-2 justify-content-center">
              <a href="${item.pdf1}" class="btn btn-primary burg-life-btn rounded-3" target="_blank">${item.btn1}</a>
              <a href="${item.pdf2}" class="btn btn-primary burg-life-btn rounded-3" target="_blank">${item.btn2}</a>
            </div>
          </div>
        </div>
      `;

      // Set the inner HTML of the column div to the card structure
      colDiv.innerHTML = cardHtml;

      // Append the card to the row
      rowDiv.appendChild(colDiv);
    });

    // Append the row to the main container
    contentDiv.appendChild(rowDiv);
  })
  .catch((error) => console.error("Error loading JSON:", error));

document.addEventListener("DOMContentLoaded", function () {
  // Show the modal on page load
  const modal = document.getElementById("popup-modal");
  const closeBtn = document.getElementById("close-popup");

  // Display the modal
  modal.style.display = "block";

  // Close the modal when clicking on the close button
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Close the modal when clicking outside of the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});

document
  .getElementById("subscribe-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let name = e.target.name.value;
    let email = e.target.email.value;
    let whatsapp = e.target.whatsapp.value;

    const modal = document.getElementById("popup-modal");

    // Send data to the serverless function
    fetch("/.netlify/functions/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, whatsapp }),
    })
      .then((response) => response.json())
      .then((result) => {
        const formStatus = document.getElementById("form-status");
        if (result.message === "Successfully subscribed!") {
          formStatus.innerHTML = "Thank you for subscribing!";
          formStatus.style.color = "green";
          // clear the form
          e.target.name.value = "";
          e.target.email.value = "";
          e.target.whatsapp.value = "";
          // close the form
          modal.style.display = "none";
        } else {
          formStatus.innerHTML = "An error occurred. Please try again.";
          formStatus.style.color = "red";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        const formStatus = document.getElementById("form-status");
        formStatus.innerHTML = "An error occurred. Please try again.";
        formStatus.style.color = "red";
      });
  });

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxVideo = document.querySelector(".lightbox-video");

// Lightbox in timeline section
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".view-photo-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const images = [
        "/assets/images/milestone/milestone_1.jpg",
        "/assets/images/milestone/milestone_2.jpg",
      ];
      lightboxImg.src = images[index];
      lightbox.style.display = "flex";
    });
  });
});

// Lightbox in Qualification section
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".qualification-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const images = [
        "/assets/images/cert/cert-1-min.png",
        "/assets/images/cert/cert-2-min.png",
        "/assets/images/cert/cert-3-min.png",
      ];
      lightboxImg.src = images[index];
      lightbox.style.display = "flex";
      lightboxImg.style.maxWidth = "800px";
      lightboxImg.style.maxHeight = "800px";
      lightboxImg.style.margin = "auto";
    });
  });
});

// Lightbox in Gallery section
document.querySelectorAll(".lightbox-trigger").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const imgSrc = link.getAttribute("href"); // Get the href (image or video URL)
    const videoSrc = link.getAttribute("data-video"); // Get the data-video attribute

    if (videoSrc) {
      // Handle video
      lightboxVideo.src = videoSrc; // Set the iframe src to the video URL
      lightboxVideo.style.display = "block"; // Show the video
      lightboxImg.style.display = "none"; // Hide the image
    } else {
      // Handle image
      lightboxImg.src = imgSrc; // Set the image src
      lightboxImg.style.display = "block"; // Show the image
      lightboxVideo.style.display = "none"; // Hide the video
    }

    lightbox.style.display = "flex"; // Display the lightbox
  });
});

// Clear iframe source and hide lightbox on close
lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
  lightboxImg.src = ""; // Clear image src
  lightboxVideo.src = ""; // Clear video src
});

// Close lightbox on clicking outside the content
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
    lightboxImg.src = ""; // Clear image src
    lightboxVideo.src = ""; // Clear video src
  }
});
