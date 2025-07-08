const personalKey = "nikolay-skorikov"
const apiUrl = `https://wedev-api.sky.pro/api/v2/${personalKey}/comments`
const authUrl = `https://wedev-api.sky.pro/api/user/login`

export async function fetchCommentsFromAPI() {
    const response = await fetch(apiUrl)
    if (!response.ok) {
        throw new Error("Ошибка сервера")
    }
    return response.json()
}

export async function postCommentToAPI({ text, token }) {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Ошибка сервера")
    }

    return response.json()
}

export async function loginUser({ login, password }) {
    const response = await fetch(authUrl, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Ошибка авторизации")
    }

    return response.json()
}

export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(resolve, interval)
    })
}
