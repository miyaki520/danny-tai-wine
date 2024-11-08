fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const contentDiv = document.getElementById("content");

    // Create title element
    const title = document.getElementById("content-title")
    title.textContent = data.title;

    // Create description element
    const description = document.createElement("p");
    description.textContent = data.description;

    // Create list element
    const list = document.createElement("ul");
    data.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.appendChild(listItem);
    });

    // Append elements to content div
    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(list);
  })
  .catch((error) => console.error("Error loading JSON:", error));
