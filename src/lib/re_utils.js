import { browser } from '$app/environment'
import dayjs from 'dayjs';

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

const cut_off_date = dayjs("2022-04-15");

export function compareTime(created_at) {
    console.log(created_at);
    let check_date = dayjs(created_at).add(10, 'month');
    if (dayjs(cut_off_date).isAfter(dayjs(created_at), 'month')) {
        console.log("run2");
        return !dayjs(check_date).isBefore(dayjs(), 'month');
    }
    console.log("run");
    return false;
}
