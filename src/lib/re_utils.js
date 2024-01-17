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
