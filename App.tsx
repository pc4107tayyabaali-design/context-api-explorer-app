import { Platform } from 'react-native';

// This ensures basic web styles are applied
if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.textContent = `
    html, body, #root { height: 100%; margin: 0; padding: 0; }
  `;
  document.head.appendChild(style);
}
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApiProvider } from './context/ApiContext';
import { ThemeProvider } from './context/ThemeContext';
import AppNavigator from './navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ApiProvider>
            <AppNavigator />
          </ApiProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
