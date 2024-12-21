// Function to load topics from local storage
function loadTopics() {
  return JSON.parse(localStorage.getItem("topics")) || {};
}

// Function to save topics to local storage
function saveTopics(topics) {
  localStorage.setItem("topics", JSON.stringify(topics));
}

// Admin Page Logic
if (document.getElementById("admin-form")) {
  const form = document.getElementById("admin-form");
  const previewBtn = document.getElementById("preview-btn");
  const previewContent = document.getElementById("preview-content");

  // Function to display saved topics on the Admin page
  function displaySavedTopics() {
    const topics = loadTopics();
    const topicsList = document.getElementById("topics-list");
    topicsList.innerHTML = ""; // Clear the list before re-rendering

    Object.keys(topics).forEach((topic) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>${topic}</strong>
        <button data-topic="${topic}" class="edit-btn">Edit</button>
        <button data-topic="${topic}" class="delete-btn">Delete</button>
      `;
      topicsList.appendChild(listItem);
    });
  }

  // Load saved topics on page load
  document.addEventListener("DOMContentLoaded", () => {
    displaySavedTopics();
  });

  // Add new or edited content
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const topic = document.getElementById("topic").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!topic || !content) return alert("Please fill out both fields!");

    const topics = loadTopics();
    topics[topic] = content;
    saveTopics(topics);

    alert("Content saved!");
    form.reset();
    previewContent.innerHTML = "";
    displaySavedTopics(); // Refresh the list after saving
  });

  // Preview content before saving
  previewBtn.addEventListener("click", () => {
    const content = document.getElementById("content").value.trim();
    previewContent.innerHTML = content ? content : "<p>No content to preview.</p>";
  });

  // Edit or delete saved topics
  document.getElementById("topics-list").addEventListener("click", (e) => {
    const topic = e.target.dataset.topic;

    if (e.target.classList.contains("edit-btn")) {
      const topics = loadTopics();
      document.getElementById("topic").value = topic;
      document.getElementById("content").value = topics[topic];
    }

    if (e.target.classList.contains("delete-btn")) {
      const topics = loadTopics();
      delete topics[topic];
      saveTopics(topics);
      displaySavedTopics(); // Refresh the list after deleting
    }
  });
}

// User Page Logic
if (document.getElementById("user-tabs")) {
  const topics = loadTopics();
  const tabs = document.getElementById("user-tabs");
  const contentSection = document.getElementById("user-content");

  // Create tabs based on the saved topics
  Object.keys(topics).forEach((topic) => {
    const tab = document.createElement("li");
    tab.textContent = topic;
    tab.dataset.topic = topic;
    tabs.appendChild(tab);
  });

  // Display the content for the selected topic when a tab is clicked
  tabs.addEventListener("click", (e) => {
    const topic = e.target.dataset.topic;
    if (topic) {
      // Use innerHTML to render the content as HTML
      contentSection.innerHTML = topics[topic] || "<p>Content not available for this topic.</p>";
    }
  });
}
