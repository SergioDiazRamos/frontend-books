import Head from 'next/head';

export const Seo = ({ pageTitle, pageDescription }) => {
  // const title = pageTitle ? `${pageTitle} :: Books App` : 'Books App';

  return (
    <Head>
      <title>{pageTitle ? `${pageTitle} :: Books App` : 'Books App'}</title>
      <meta
        name="description"
        content={pageDescription ? pageDescription : 'Descripción general'}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
