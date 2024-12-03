// Function to fetch the RSS feed
function fetchNews() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ikon.mn/rss', true);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xml = xhr.responseText;
            parseRSS(xml);  // Pass the XML to be parsed
        }
    };
    xhr.send();
}

// Function to parse the RSS feed XML and display the data
function parseRSS(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');
    const items = xmlDoc.getElementsByTagName('item');
    
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';  // Clear existing content in the list

    // Loop through each item in the RSS feed and display it
    for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0].textContent;
        const description = items[i].getElementsByTagName('description')[0].textContent;
        const link = items[i].getElementsByTagName('link')[0].textContent;

        const listItem = document.createElement('li');
        // Construct the HTML for each list item
        listItem.innerHTML = `<a href="${link}" target="_blank">${title}</a><p>${description}</p>`;
        newsList.appendChild(listItem);  // Append the list item to the news list
    }
}

// Run the function to fetch and display the news once the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchNews();
});
