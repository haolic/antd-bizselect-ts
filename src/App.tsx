import React from 'react';
import BaseLayout from './components/BaseLayout';
import BizSelect from './pages/BizSelect';
import OrderTable from './pages/OrderTable';
import Home from './pages';
import { Route, Switch } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <BaseLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/OrderTable" component={OrderTable} />
            <Route exact path="/bizSelect" component={BizSelect} />
          </Switch>
      </BaseLayout>
    </div>
  );
};

export default App;
