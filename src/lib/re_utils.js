import { browser } from '$app/environment'

export function browserSet(key, value){
    if(browser) {
        localStorage.setItem(key, value)
    }
}

export function browserSessionSet(key, value){
    if(browser) {
        sessionStorage.setItem(key, value)
    }
}

export function compareTime(time1, time2) {
    return new Date(time1) < new Date(time2); // true if time1 is earlier
}
