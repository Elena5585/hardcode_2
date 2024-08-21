import { books, reviews, users } from "./mocks";

const getAsync = (value) => {
  return new Promise((res) => {
    setTimeout(() => res(value), Math.random() * 3000);
  });
};

export const getBooks = () => getAsync(books);
export const getUsers = () => getAsync(users);
export const getReviews = () => getAsync(reviews);
