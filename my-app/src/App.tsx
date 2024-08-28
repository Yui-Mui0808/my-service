// App.tsx
import React from 'react';
import InvoiceList from './components/InvoiceList';
import './styles.css';  // CSSをインポート

const App: React.FC = () => {
    return (
        <div className="app">
            <h1>請求書表示サービス</h1>
            <InvoiceList />
        </div>
    );
};

export default App;

