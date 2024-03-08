import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import  Navbar  from "@/component/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return <div id = "app" style={{width:"100vw", height:"100vh"}}>
          <RecoilRoot>
              <Navbar />
              <Component {...pageProps} />
            <ToastContainer position='top-right' theme='colored' />
          </RecoilRoot>
  </div>;
}
