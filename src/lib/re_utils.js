import { browser } from '$app/env'

export function browserSet(key, value){
    if(browser) {
        localStorage.setItem(key, value)
    }
}
