import React from 'react';
import './App.css';

// 必要なインポートを追加
import { InvoiceProvider } from './context/InvoiceContext'; // InvoiceProviderをインポート
import InvoiceList from './components/InvoiceList'; // InvoiceListをインポート
import InvoiceDetails from './components/InvoiceDetails'; // InvoiceDetailsをインポート

const App: React.FC = () => {
    return (
        <div className="app-container"> {/* この行を追加 */}
            <InvoiceProvider>
                <div>
                    <h1>請求書表示サービス</h1>
                    <InvoiceList />
                    <InvoiceDetails />
                </div>
            </InvoiceProvider>
        </div>
    );
};

export default App;
