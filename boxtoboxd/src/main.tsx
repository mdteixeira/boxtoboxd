import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListMatches from './pages/ListMatches.tsx';
import Footer from './components/Footer.jsx';
import ListRatings from './pages/ListRatings.tsx';
import IndividualRating from './pages/individualRating.tsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <App />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListRatings />} />
                <Route path="/matches" element={<ListMatches />} />
                <Route path="/rating/:id" element={<IndividualRating />} />
            </Routes>
        </BrowserRouter>
        <Footer />
    </>
);
