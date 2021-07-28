
const URLS = new Map();

function insert(shortenedURL, originalURL) {
    return URLS.set(shortenedURL, originalURL);
}

function select(shortenedURL) {
    return URLS.get(shortenedURL);
}

function clear(shortenedURL) {
    return !!URLS.delete(shortenedURL);
}

module.exports = {
    Save: insert,
    Get: select,
    Delete: clear
}