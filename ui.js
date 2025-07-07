import { getComments, getLoadingState, getAuthData } from "./comment.js"
import { toggleLike, setupQuote } from "./listeners.js"
import { escapeHtml } from "./utilits.js"

export function renderComments() {
    const commentsList = document.querySelector(".comments")
    const { isLoading, isAdding } = getLoadingState()
    const authData = getAuthData()

    if (!commentsList) return

    commentsList.innerHTML = isLoading
        ? '<div class="loading">Загрузка комментариев...</div>'
        : ""

    if (isLoading) return

    const comments = getComments()
    comments.forEach((comment, index) => {
        const commentItem = document.createElement("li")
        commentItem.className = "comment"
        commentItem.dataset.index = index

        commentItem.innerHTML = `
            <div class="comment-header">
                <div>${escapeHtml(comment.author?.name || "Аноним")}</div>
                <div>${new Date(comment.date).toLocaleString()}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${escapeHtml(comment.text)}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button 
                        ${comment.isLiked ? "-active-like" : ""}
                        ${comment.isLikeLoading ? "-loading-like" : ""}"
                        data-index="${index}"></button>
                </div>
            </div>
        `

        commentItem
            .querySelector(".comment-text")
            .addEventListener("click", () => {
                setupQuote(comment)
            })

        const likeButton = commentItem.querySelector(".like-button")
        if (likeButton) {
            likeButton.addEventListener("click", (e) => {
                e.stopPropagation()
                toggleLike(parseInt(e.target.dataset.index))
            })
        }

        commentsList.appendChild(commentItem)
    })

    // Обновляем отображение формы в зависимости от авторизации
    updateAuthState()
}

export function updateFormState(isLoading) {
    const button = document.querySelector(".add-form-button")
    const inputs = document.querySelectorAll(".add-form-text")

    if (button) button.disabled = isLoading
    inputs.forEach((input) => {
        input.disabled = isLoading
    })

    if (button) button.textContent = isLoading ? "Отправка..." : "Написать"
}

export function updateAuthState() {
    const authData = getAuthData()
    const authLink = document.querySelector(".auth-link")
    const addForm = document.querySelector(".add-form")
    const nameInput = document.querySelector(".add-form-name")

    if (authData) {
        // Пользователь авторизован
        if (authLink) authLink.style.display = "none"
        if (addForm) addForm.style.display = "flex"
        if (nameInput) {
            nameInput.value = authData.name
            nameInput.disabled = false
        }
    } else {
        // Пользователь не авторизован
        if (authLink) authLink.style.display = "block"
        if (addForm) addForm.style.display = "none"
        if (nameInput) {
            nameInput.value = ""
            nameInput.disabled = true
        }
    }
}

export function showCommentsSection() {
    document.getElementById("auth-section").style.display = "none"
    document.getElementById("comments-section").style.display = "block"
    updateAuthState()
}

export function showAuthSection() {
    document.getElementById("auth-section").style.display = "block"
    document.getElementById("comments-section").style.display = "none"
}
