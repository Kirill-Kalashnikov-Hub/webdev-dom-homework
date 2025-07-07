import {
    postCommentToAPI,
    fetchCommentsFromAPI,
    delay,
    loginUser,
} from "./api.js"
import {
    updateCommentsData,
    setLoading,
    setAdding,
    updateCommentLike,
    getComments,
    getAuthData,
    setAuthData,
} from "./comment.js"
import {
    renderComments,
    updateFormState,
    showCommentsSection,
    showAuthSection,
} from "./ui.js"

export function setupAddComment(commentInput, addButton, errorMessage) {
    addButton.addEventListener("click", async () => {
        const text = commentInput.value.trim()
        const authData = getAuthData()

        if (!text) {
            errorMessage.textContent = "Пожалуйста, введите текст комментария"
            errorMessage.style.display = "block"
            return
        }

        try {
            setAdding(true)
            updateFormState(true)

            await postCommentToAPI({ text, token: authData.token })
            setLoading(true)
            renderComments()

            const data = await fetchCommentsFromAPI()
            updateCommentsData(data.comments)

            commentInput.value = ""
            errorMessage.style.display = "none"
        } catch (error) {
            errorMessage.textContent = error.message
            errorMessage.style.display = "block"
        } finally {
            setLoading(false)
            setAdding(false)
            updateFormState(false)
            renderComments()
        }
    })
}

export function setupAuth(loginInput, passwordInput, authButton, errorMessage) {
    authButton.addEventListener("click", async () => {
        const login = loginInput.value.trim()
        const password = passwordInput.value.trim()

        if (!login || !password) {
            errorMessage.textContent = "Пожалуйста, заполните все поля"
            errorMessage.style.display = "block"
            return
        }

        try {
            const data = await loginUser({ login, password })
            setAuthData({
                token: data.user.token,
                name: data.user.name,
            })

            showCommentsSection()
            renderComments()
        } catch (error) {
            errorMessage.textContent = error.message
            errorMessage.style.display = "block"
        }
    })
}

export function setupLoginLink(loginLink) {
    loginLink.addEventListener("click", (e) => {
        e.preventDefault()
        showAuthSection()
    })
}

export function toggleLike(index) {
    const comments = getComments()
    if (!comments[index]) return

    updateCommentLike(index, true)
    renderComments()

    delay(1000).then(() => {
        comments[index].isLiked = !comments[index].isLiked
        comments[index].likes += comments[index].isLiked ? 1 : -1
        updateCommentLike(index, false)
        renderComments()
    })
}

export function setupQuote(comment) {
    const commentInput = document.querySelector(".add-form-text")
    if (commentInput) {
        commentInput.value = `> ${comment.text}\n\n`
        commentInput.focus()
    }
}
