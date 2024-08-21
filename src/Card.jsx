import React from "react";

const Card = ({ book, users, reviews }) => {
  const review = getReview(book) ? getReview(book) : `Нет отзыва`;
  const authorReview = getAuthorReview(book)
    ? getAuthorReview(book)
    : `Отзыв без автора`;

  function getAuthor(book) {
    const userItem = users.filter((user) => user.id == book.author);
    return userItem[0]?.name;
  }

  function getReview(book) {
    const reviewItem = reviews.filter((rev) => rev.id === book.reviews[0]);
    return reviewItem[0]?.text;
  }

  function getAuthorReview(book) {
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < reviews.length; j++) {
        if (users[i].id === reviews[j].userId) {
          if (reviews[j].id == book.reviews) {
            return users[i].name;
          }
        }
      }
    }
  }

  return (
    <div>
      <h3>{book.name}</h3>
      <p>
        <b>Автор</b>: {getAuthor(book)}
      </p>
      <p>
        <b>Описание</b>: {book.description}
      </p>
      <p>
        <b>Отзыв: </b>
        {review}
      </p>
      <p>
        <b>Автор отзыва: </b>
        {authorReview}
      </p>
    </div>
  );
};

export default Card;
