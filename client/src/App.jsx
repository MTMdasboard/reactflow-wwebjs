import React from 'react';
import LayoutFlow from './components/layouts/LayoutFlow';
import 'reactflow/dist/style.css';
import './App.css'

const App = () => {
  return (
    <div style={{ height: '100%' }}>
      <LayoutFlow />
    </div>
  );
};

export default App;
