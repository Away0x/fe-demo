import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from 'containers/theme';
import ChatApp from 'components/ChatApp';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ChatApp />
      </ThemeProvider>
    </Router>
  );
}

export default App;
