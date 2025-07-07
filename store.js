let comments = [];
let user = null;
let isLoading = false;

export const getComments = () => comments;
export const getUser = () => user;
export const getLoadingState = () => isLoading;

export const setComments = (newComments) => {
    comments = newComments;
};

export const setUser = (userData) => {
    user = userData;
    if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
    } else {
        localStorage.removeItem('user');
    }
};

export const setLoading = (state) => {
    isLoading = state;
};

export const initUser = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        user = JSON.parse(savedUser);
    }
};