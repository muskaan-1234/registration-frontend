import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Batchmaster from './batches/Batchmaster.jsx'
import Batchmanager from './batches/Batchmanager.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <Batchmaster/> */}
    {/* <Batchmanager/> */}
  </React.StrictMode>,
)
