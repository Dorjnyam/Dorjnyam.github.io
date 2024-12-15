const xhr = new XMLHttpRequest();
xhr.open("GET", "rss.xml");
xhr.onload = function () {
    if (xhr.status === 200) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
        const items = xmlDoc.getElementsByTagName("item");
        const newsContainer = document.getElementById("news-container");

        newsContainer.innerHTML = "";

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            const title = item.getElementsByTagName("title")[0].textContent;
            const description = item.getElementsByTagName("description")[0].textContent;
            const pubDate = item.getElementsByTagName("pubDate")[0].textContent;
            const link = item.getElementsByTagName("link")[0].textContent;
            const imageUrl = item.getElementsByTagName("media:content")[0]?.getAttribute("url") || '';

            const newsItem = document.createElement("div");
            newsItem.className = "news-item";

            newsItem.innerHTML = `
                <h2><a href="${link}" target="_blank">${title}</a></h2>
                <p>${description}</p>
                ${imageUrl ? `<img src="${imageUrl}" alt="${title} зураг">` : ''}
                <p class="pub-date">Хэвлэгдсэн огноо: ${new Date(pubDate).toLocaleDateString()}</p>
            `;

            newsContainer.appendChild(newsItem);
        }
    } else {
        console.error("RSS татахад алдаа гарлаа.");
        document.getElementById("news-container").innerHTML = "Мэдээ татаж чадсангүй.";
    }
};
xhr.onerror = function () {
    console.error("Хүсэлт илгээхэд алдаа гарлаа.");
    document.getElementById("news-container").innerHTML = "Сервертэй холбогдож чадсангүй.";
};
xhr.send();
