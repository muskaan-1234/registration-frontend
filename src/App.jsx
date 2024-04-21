import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Batchmaster from './batches/Batchmaster'
import Batchmanager from './batches/Batchmanager'
import RegistrationForm from './RegistrationForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/batchmaster" element={<Batchmaster />} />
        <Route path="/batchmanager" element={<Batchmanager />} />
        <Route path="/" element={<RegistrationForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
