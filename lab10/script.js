function fetchNews() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ikon.mn/rss', true);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xml = xhr.responseText;
            parseRSS(xml);  
        }
    };
    xhr.send();
}

function parseRSS(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');
    const items = xmlDoc.getElementsByTagName('item');
    
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';  

    for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0].textContent;
        const description = items[i].getElementsByTagName('description')[0].textContent;
        const link = items[i].getElementsByTagName('link')[0].textContent;
        const listItem = document.createElement('li');
        
        listItem.innerHTML = `<a href="${link}" target="_blank">${title}</a><p>${description}</p>`;
        newsList.appendChild(listItem);  
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchNews();
});
