// App.tsx

import React from 'react';
import Invoice from './components/Invoice';
import { sampleInvoiceData } from './models/InvoiceModel';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Invoice data={sampleInvoiceData} />
    </div>
  );
};

export default App;
