import React from 'react'
import Nav from './Nav'
import Main from './Main'
import Results from './Results'
import ResultDetails from './ResultDetails'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Route component={Nav} /> {/* pathless route is always rendered: */}
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/forecast' component={Results} />
            <Route path='/details/:city' component={ResultDetails} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App

