
const URLS = new Map();

function insert(shortenedURL, originalURL) {
    let result = null;
    try {

        URLS.set(shortenedURL, originalURL);

        result = true;

    } catch (error) {
        console.error(error);
    }
    return result;
}

function select(shortenedURL) {
    let result = null;
    try {

        result = URLS.get(shortenedURL);
    }
    catch (error) {
        console.error(error);
    }
    return result;
}

function clear(shortenedURL) {
    let result = null;

    try {

        URLS.delete(shortenedURL);

        result = true;

    } catch (error) {
        console.error(error);
    }
    return result;
}

module.exports = {
    Save: insert,
    Get: select,
    Delete: clear
}