import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TweetsContextProvider } from './contexts/TweetsContext';
import Home from './pages/Home';
import './App.global.css';

/**
 * Define the main "App" component of the application.
 * @returns A ReactNode content of the component.
 */
export default function App() {
  return (
    <TweetsContextProvider>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </TweetsContextProvider>
  );
}
