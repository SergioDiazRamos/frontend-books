import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Seo } from 'components';

const BookEditPage = ({ book }) => {
  const { title, id } = book;
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState(title);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title: bookTitle,
          _method: 'PATCH',
        }),
      }
    );

    if (res.ok) {
      setErrors([]);
      setBookTitle('');
      return router.push('/libros');
    } else {
      const data = await res.json();
      setErrors(data.errors);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo pageTitle="Editar Libro" />

      <h1>Book Edit Page</h1>
      <div>
        <Link href="/libros">Book List</Link>
      </div>
      <br />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setBookTitle(e.target.value)}
          value={String(bookTitle)}
          disabled={submitting}
          data-cy="input-book-title"
        />
        <button disabled={submitting} data-cy="button-submit-book">
          {submitting ? 'Enviando...' : 'Enviar'}
        </button>
        {errors.title && <span className="error">{errors.title}</span>}
      </form>
    </>
  );
};

export default BookEditPage;

export const getServerSideProps = async ({ params }) => {
  const { bid } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${bid}`
  );
  const data = await res.json();

  return {
    props: { book: data },
  };
};
