import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './state/Store';
import { BrowserRouter } from 'react-router-dom';
import {createRoot} from "react-dom/client";
import React from 'react';

const root = document.getElementById('root');

if (root) {
    const reactRoot = createRoot(root);

    reactRoot.render(
        <Provider store={store}>
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        </Provider>
    );

    reportWebVitals();
} else {
    console.error("Root element with id 'root' not found.");
}

