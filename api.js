import { getCurrentDateTime } from "./utils.js";

const host = " https://wedev-api.sky.pro/api/v1/kirill-kalashnikov-hub";
export const fetchComments = () => {
  return fetch(host + "/comments")
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          data: new Date(comment.date),
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
      date: getCurrentDateTime(),
    }),
  }).then(() => {
    return fetchComments();
  });
};
