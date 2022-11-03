import Link from 'next/link';

import { Seo } from 'components';

const BookShowPage = ({ book }) => {
  return (
    <>
      <Seo pageTitle="Libro" />

      <h1>{book.title}</h1>
      <Link href="/libros">Book List</Link>
    </>
  );
};

export default BookShowPage;

export const getStaticProps = async ({ params }) => {
  const { bid } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${bid}`
  );
  const data = await res.json();

  return {
    props: {
      book: data,
    },
  };
};

export const getStaticPaths = async (ctx) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`);
  const data = await res.json();
  const paths = data.map((book) => ({ params: { bid: String(book.id) } }));

  return {
    paths,
    fallback: false,
  };
};
