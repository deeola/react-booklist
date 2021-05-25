import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useBooksApi from '../hooks/useBooksApi';
import { saveAuthToken } from '../utils/local-storage';

import Book from '../components/Book';
import Header from '../components/Header';

export default function DashboardPage() {
  const { getAccessTokenSilently } = useAuth0();
  const { getAllBooks } = useBooksApi();
  const [books, setBooks] = useState([]);

  useEffect(async () => {
    const getAccessToken = async () => {
      try {
        const retrievedAccessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: 'read:current_user',
        });
        saveAuthToken(retrievedAccessToken);
      } catch (e) {
        console.log(e.message);
      }
    };

    const getAllBooksEffect = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (e) {
        console.log(e.message);
      }
    };

    await getAccessToken();
    getAllBooksEffect();
  }, []);

  return (
    <section className="sm:grid grid-cols-layout ">
      <Header />
      <div className="row-start-2 col-start-2 min-h-full bg-gray-100">
        <div>
          <h2 className="text-gray-900 text-3xl font-bold px-5 pt-5">Books</h2>
        </div>
        <div className="grid gap-x-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-6 pb-6">
          {books.map((book, i) => (
            <Book book={book} key={`book${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
