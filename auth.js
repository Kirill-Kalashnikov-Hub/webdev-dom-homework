const userApiUrl = "https://wedev-api.sky.pro/api/user"
const loginApiUrl = `${userApiUrl}/login`

export let token = null
export let userName = null

export const setToken = (newToken) => {
    token = newToken
}

export const setUserName = (name) => {
    userName = name
}

export const login = async ({ login, password }) => {
    try {
        const response = await fetch(loginApiUrl, {
            method: "POST",
            body: JSON.stringify({ login, password }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || "Неверный логин или пароль")
        }

        const data = await response.json()
        return data.user
    } catch (error) {
        if (error.message === "Failed to fetch") {
            throw new Error("Проблемы с интернетом. Проверьте соединение")
        }
        throw error
    }
}
