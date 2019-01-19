// Functions to create a short text out of whole blog's content
function toText(node) {
    let tag = document.createElement('div')
    tag.innerHTML = node
    node = tag.innerText
    return node
}
function getImage(node) {
    let tag = document.createElement('div')
    tag.innerHTML = node
    node = tag.getElementsByTagName("img")[0].src
    return node
}
function shortenText(text, startingPoint, maxLength) {
    return text.length > maxLength ?
        text.slice(startingPoint, maxLength) :
        text
}

var feed = "https://cors-anywhere.herokuapp.com/https://medium.com/feed/@pabloblancoo";

$.ajax(feed, {
    accepts: {
        xml: "application/rss+xml"
    },
    dataType: "xml",
    success: function (data) {
        //Credit: http://stackoverflow.com/questions/10943544/how-to-parse-an-rss-feed-using-javascript
        let output = '';
        $(data).find("item").each(function () { // or "item" or whatever suits your feed

            var title = this.getElementsByTagName("title")[0].textContent;
            var link = this.getElementsByTagName("link")[0].textContent;
            var description = this.getElementsByTagName("content:encoded")[0].textContent;
            var imageSrc = getImage(description);

            output += `
            <article class="col-6 col-12-xsmall work-item">
                <a href="${imageSrc}" class="image fit thumb"><img src="${imageSrc}" alt="${title}"/></a>
                <a href="${link}"><h3>${shortenText(title, 0, 30) + '...'}</h3></a>
                <a href="${link}"><p>${shortenText(toText(description), 0, 240) + '...'}</p></a>
            </article>`;
        });
        document.querySelector('.blog__slider').innerHTML = output;

    }
});
