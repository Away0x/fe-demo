import React from 'react';

import { RootProvider } from '@/stores';
import { GlobalErrorBoundary } from '@/components/ErrorBoundary';
import Routes from '@/routes';

function App() {
  return (
    <GlobalErrorBoundary>
      <RootProvider>
        <Routes />
      </RootProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
