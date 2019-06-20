import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavigationContainer from './components/Navigation/NavigationContainer';
import Home from './components/Home/Home';
import Resume from './components/Resume/Resume';
import ContactMe from './components/ContactMe/ContactMe';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onResumePage: false
    };
    this.changePageState = this.changePageState.bind(this);
  }

  changePageState(e) {
    e.persist();
    if(e.target.pathname === '/Resume') {
      this.setState({
        onResumePage: true
      })
    }

    else {
      this.setState({
        onResumePage: false
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationContainer pageState={this.changePageState} />

          <Route path="/" exact component={Home} />
          <Route path="/Resume" component={Resume} />
        </Router>
        <ContactMe />
      </React.Fragment>
    );    
  }
}

export default App;
