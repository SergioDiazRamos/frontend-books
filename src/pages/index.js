import Link from 'next/link';

import { Seo } from 'components/Seo';

const HomePage = () => {
  return (
    <>
      <Seo />
      <h1>Books App</h1>

      <Link href="/libros" data-cy="link-to-books">
        Book List
      </Link>
    </>
  );
};

export default HomePage;
