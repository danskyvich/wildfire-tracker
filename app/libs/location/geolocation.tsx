// HTML Geolocation API to locate user
export function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        
    }
}

function success() {

}

function error() {

}