export default function getDomain(url) {
    // Remove protocol (http://, https://, ftp:// etc.) if present
    let domain = url.replace(/(^\w+:|^)\/\//, '');

    // Remove path, query string, and fragment identifier
    domain = domain.split('/')[0];

    // Remove port number if present
    domain = domain.split(':')[0];

    // Remove 'www.' if it exists
    domain = domain.replace(/^www\./, '');

    return domain;
}
