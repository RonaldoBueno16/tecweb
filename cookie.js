function AddCookie(cookieName, value, expire) {
    document.cookie = cookieName + "=" + value + ";" + expire + ";path=/";
}

function ReadCookie(cookieName) {
    const coockies = document.cookie.split(';');
    return coockies.forEach(cookie => {
        if(cookieName == cookie.split('=')[0]) {
            return cookie.split('=')[1];
        }
    })
}

function LoadCookie(cookiename) {
    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
        const name = cookie.split('=')[0].replace(' ', '');

        if(name == cookiename) {
            const userData = cookie.split('=')[1];
            
            WriteInput(cookiename, userData);
            return;
        }
    })
}