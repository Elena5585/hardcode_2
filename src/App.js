import "./styles.css";
import { getBooks, getUsers, getReviews } from "./lib/api";
import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

// Техническое задание:
// Доработать приложение App, чтобы в отрисованном списке
// были реальные отзывы, автор книги и автор отзыва.
// Данные об отзывах и пользователях можно получить при помощи асинхронных
// функций getUsers, getReviews

// функция getBooks возвращает Promise<Book[]>
// функция getUsers возвращает Promise<User[]>
// функция getReviews возвращает Promise<Review[]>

// В объектах реализующих интерфейс Book указаны только uuid
// пользователей и обзоров

// // В объектах реализующих интерфейс BookInformation, ReviewInformation
// указана полная информация об пользователе и обзоре.

const App = () => {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const toBookInformation = (book) => {
    return {
      id: book.id,
      name: book.name || "Книга без названия",
      author: book.authorId,
      reviews: book.reviewIds,
      description: book.description,
    };
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const fetchedBooks = await getBooks();
      const fetchedReviews = await getReviews();
      const fetchedUsers = await getUsers();
      setBooks(fetchedBooks);
      setReviews(fetchedReviews);
      setUsers(fetchedUsers);
      setIsLoading(false);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Мои книги:</h1>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading &&
        books.map((b) => (
          <Card
            key={b.id}
            book={toBookInformation(b)}
            users={users}
            reviews={reviews}
          />
        ))}
    </div>
  );
};

export default App;
