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
  
