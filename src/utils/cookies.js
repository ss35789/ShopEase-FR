export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const element of cookies) {
        const cookie = element.trim();

        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
