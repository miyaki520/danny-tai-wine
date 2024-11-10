fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const contentDiv = document.getElementById("burg-life-block-content");

    const rowDiv = document.createElement("div");
    rowDiv.className = "row justify-content-center";

    data.forEach((item) => {
      // Create a column div for each card
      const colDiv = document.createElement("div");
      colDiv.className = "col-md-6 col-lg-4 col-12 text-center";

      // Create the card structure
      const cardHtml = `
        <div class="card border-0">
          <img src="${item.image}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title century-gothic-bold text-burgundy">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <a href="${item.pdf}" class="btn btn-primary burg-life-btn rounded-3" target="_blank">View More</a>
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


  document.addEventListener("DOMContentLoaded", function() {
    // Show the modal on page load
    const modal = document.getElementById("popup-modal");
    const closeBtn = document.getElementById("close-popup");
  
    // Display the modal
    modal.style.display = "block";
  
    // Close the modal when clicking on the close button
    closeBtn.onclick = function() {
      modal.style.display = "none";
    };
  
    // Close the modal when clicking outside of the modal content
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  });

  document.getElementById("subscribe-form").addEventListener("submit", function (e) {
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
  