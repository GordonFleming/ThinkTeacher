import { writable } from 'svelte/store'

export const name = writable()
export const surname = writable()
export const id = writable()
export let firstTime = writable(true)
export let errMsg = writable("")
export const ttNum = writable("")
export let benType = writable("")
