import { Typography } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppHeader from './AppHeader';

function App() {
    return (
        <div className='App'>
            <AppHeader />
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}
