import { writable } from 'svelte/store'

export const user = writable()
export const name = writable()
export const id = writable()
export let firstTime = writable(true)
export let travelScroll = writable("")
export let travelType = writable("")
export let errMsg = writable("")


export default user
