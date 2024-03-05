import Layout from "./Components/Layout";
import MainC from "./Components/MainC";
import { MyProvider } from "./context/appContext";

function MyApp({ Component, pageProps }) {
  return (
    <MyProvider>
      <Layout>
        <MainC/>
      </Layout>
    </MyProvider>
  );
}

export default MyApp;
