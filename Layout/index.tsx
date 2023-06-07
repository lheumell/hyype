import Head from "next/head";

import Footer from "../components/Organisms/Footer";
import Header from "../components/Organisms/Header";
import GuardedPage from "../components/GuardedPage";

const Layout = (props: any) => {
  const { children, title, isGuarded } = props;
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {isGuarded ? (
        <GuardedPage whenSignedOut="/auth/sign-up">
          <div className="content">{children}</div>
        </GuardedPage>
      ) : (
        <div className="content">{children}</div>
      )}

      {/* <Footer /> */}
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        .content {
          height: calc(100vh - 80px);
          max-width: 1200px;
          margin: auto;
        }
      `}</style>
    </>
  );
};

export default Layout;
