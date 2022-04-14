import { browser } from '$app/env'

export function browserSet(key, value){
    if(browser) {
        localStorage.setItem(key, value)
    }
}

export function compareTime(time1, time2) {
    return new Date(time1) < new Date(time2); // true if time1 is earlier
}
