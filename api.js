const host = " https://wedev-api.sky.pro/api/v1/kirill-kalashnikov-hub";

export const fetchComments = () => {
  return fetch(host + "/comments")
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        const date = new Date(comment.date);
        const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
        return {
          name: comment.author.name,
          date: formattedDate,
          text: comment.text,
          likes: comment.likes,
        };
      });

      return appComments;
    });
};

export const postComment = (text, name) => {
  return fetch(host + "/comments", {
    method: "POST",
    body: JSON.stringify({
      text,
      name,
      date: new Date().toISOString(), // Передаем дату в формате ISO 8601
    }),
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }

      if (response.status === 400) {
        throw new Error("Неверный запрос");
      }

      if (response.status === 201) {
        return response.json();
      }
    })
    .then(() => {
      return fetchComments();
    });
};
