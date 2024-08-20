import React from 'react';
import Invoice from './components/Invoice';
import { dummyInvoice } from './models/InvoiceModel';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Invoice invoice={dummyInvoice} />
    </div>
  );
};

export default App;


