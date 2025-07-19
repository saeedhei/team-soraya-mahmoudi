import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import {ApolloProvider} from "@apollo/client";
import client from './apollo/client'
import './index.css'
import AppRouter from './router/Router.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
         <AuthProvider>
            <AppRouter />
         </AuthProvider>
      </ApolloProvider>     
    </BrowserRouter>
  </StrictMode>,
)
