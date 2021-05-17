import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { AuthContextProvider } from "../stores/authContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
