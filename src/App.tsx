import React from 'react';
import BaseLayout from './components/BaseLayout';
import BizSelect from './pages/BizSelect';
import Home from './pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <BaseLayout>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/bizSelect" component={BizSelect} />
          </Switch>
        </BrowserRouter>
      </BaseLayout>
    </div>
  );
};

export default App;
