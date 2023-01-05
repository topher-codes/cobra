import Head from "next/head";

const Header = () => {
  return (
    <Head>
      <title>Cobra</title>
      <meta
        name="description"
        content="A t3 app that is also a message board"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Header;
