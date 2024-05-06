import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {BrowserRouter} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"



const queryClient = new QueryClient({
	defaultOptions: {   // baska bir sekmeye girip sonrasında tekar bizim sekmeye girince dataların tekardan fetchlenmesini onlemek icin bu option eklenmis oldu.
		queries: {
			refetchOnWindowFocus: false,
		}
	}
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
)
