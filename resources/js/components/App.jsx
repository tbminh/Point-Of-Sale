import { Typography } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes';

function App() {
    return (
        <div className='App'>
            <AppRoutes/>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    )
}
