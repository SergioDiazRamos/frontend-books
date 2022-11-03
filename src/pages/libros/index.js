import Link from 'next/link';

import { Seo } from 'components';

const BookListPage = ({ books }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    // setSubmitting(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          _method: 'DELETE',
        }),
      }
    );

    if (res.ok) {
      window.location.href = '/libros';
    } else {
      const data = await res.json();
      setErrors(data.errors);
      // setSubmitting(false);
    }
  };

  return (
    <>
      <Seo pageTitle="Libros" />

      <h1>Books List</h1>
      <Link href="/libros/crear">Create Book</Link>

      <ul data-cy="book-list">
        {books.map((book) => {
          const { title, id } = book;
          return (
            <li key={id}>
              <Link href={`/libros/${id}`} data-cy={`link-to-visit-book-${id}`}>
                {title}
              </Link>
              {' - '}
              <Link
                href={`/libros/${id}/editar`}
                data-cy={`link-to-edit-book-${id}`}
              >
                Editar
              </Link>
              {' - '}
              <form onSubmit={(e) => handleDelete(e, id)} className="eliminar">
                <button data-cy={`button-to-delete-book-${id}`}>
                  Eliminar
                </button>
              </form>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default BookListPage;

export const getStaticProps = async (ctx) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`);
  const data = await res.json();

  return {
    props: {
      books: data,
    },
  };
};
