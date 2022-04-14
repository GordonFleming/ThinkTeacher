import { writable } from 'svelte/store'

export const name = writable()
export const surname = writable()
export const id = writable()
export let firstTime = writable(true)
export let travelScroll = writable("")
export let travelType = writable("")
export let courseType = writable("")
export let errMsg = writable("")
export const ttNum = writable("")
export const cut_off_date = writable("2022-04-15T08:00:00.000Z")
