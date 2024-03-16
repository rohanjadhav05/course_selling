import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import  Navbar  from "@/component/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
  return <div id = "app" style={{width:"100%", height:"100%"}}>
          <GoogleOAuthProvider clientId="222948262414-n4kr1jm3hgljrgrmlq928lsqra2jvli2.apps.googleusercontent.com">
          <RecoilRoot>
              <Navbar />
              <Component {...pageProps} />
            <ToastContainer position='top-right' theme='colored' />
          </RecoilRoot>
          </GoogleOAuthProvider>;
  </div>;
}
