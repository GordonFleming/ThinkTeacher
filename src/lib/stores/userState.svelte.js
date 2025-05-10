export const userState = $state({
    user: null,
    isAuthenticated: false
});

export function setUser(user) {
    userState.user = user;
    userState.isAuthenticated = !!user;
}

export function clearUser() {
    userState.user = null;
    userState.isAuthenticated = false;
} 