// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import AppWrapper from './App.jsx'
// import { store } from './components/Dashboard/storeJs/store.js'
// import { Provider } from 'react-redux'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//      <Provider store={store}>
//       <AppWrapper />
//     </Provider>
//   </StrictMode>,
// )

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import React from "react";
// import ReactDOM from "react-dom/client";
// import './index.css'
// import App from './App.jsx'
// import AppWrapper from './App.jsx'
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./services/store.js";
// import { HelmetProvider } from 'react-helmet-async';
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <StateProvider>
//           <ContextProvider>
//           <HelmetProvider>

//             <App />
//           </HelmetProvider>
//           </ContextProvider>
//         </StateProvider>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import App from "./App.jsx";
import { store } from "./services/store.js";
import "./index.css";
import StateProvider from "./context/StateContext.jsx";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { config, bsc, IOTATestnet } from '../../wagmiConfig';

import { config, bsc, bscTestnet } from "./wagmi.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <StateProvider>
          {/* <HelmetProvider> */}
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider initialChain={bsc}>
                <App />
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
          {/* </HelmetProvider> */}
        </StateProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
