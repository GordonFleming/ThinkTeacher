import { writable } from 'svelte/store'

export const user = writable()
export const name = writable()
export let firstTime = writable(true)
export let travelScroll = writable("")


export default user
