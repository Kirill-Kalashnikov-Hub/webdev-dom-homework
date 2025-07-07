let commentsData = []
let isLoading = false
let isAdding = false
let authData = null

export function getComments() {
    return commentsData
}

export function getLoadingState() {
    return { isLoading, isAdding }
}

export function getAuthData() {
    return authData
}

export function setAuthData(data) {
    authData = data
}

export function clearAuthData() {
    authData = null
}

export function updateCommentsData(newComments) {
    commentsData = (newComments || []).map((comment) => ({
        ...comment,
        isLikeLoading: false,
    }))
}

export function setLoading(state) {
    isLoading = state
}

export function setAdding(state) {
    isAdding = state
}

export function updateCommentLike(index, state) {
    if (commentsData[index]) {
        commentsData[index].isLikeLoading = state
    }
}
