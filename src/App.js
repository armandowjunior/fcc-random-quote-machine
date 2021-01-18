import React, { Component } from 'react';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import QuoteMachine from './components/QuoteMachine'

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex', 
    height: '100vh'
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      selectedQuoteIndex: null,
    }
    this.generateNewQuoteIndex = this.generateNewQuoteIndex.bind(this); // For every method that uses this, we have to bind it;
    // Or use ES7 syntax;
    this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this);
  }

  componentDidMount() { // After component is mounted
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
    .then(data => data.json()) // parsed the data
    .then(quotes => this.setState({ quotes: quotes }, this.assignNewQuoteIndex)); // could just use quotes // // Use a callback function here to define the state. Since this is assynchronous, if we put the function later in the code, it will just get an empty state.
  } // Not calling the function (the return result of it), just passing it as an callback;

  get selectedQuote() { // the get makes that the function may be called as an variable
    if (!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)) {
      return undefined;
    }
    return this.state.quotes[this.state.selectedQuoteIndex];
  }

  /**
   * Returns an integer representing an index in state.quotes
   * if state.quotes is empty, returns undefined
   */

  generateNewQuoteIndex() {
    if (!this.state.quotes.length) {
      return undefined;
    }
    return Math.floor(Math.random() * this.state.quotes.length); // could use lodash
  }

  assignNewQuoteIndex() {
    this.setState({ selectedQuoteIndex: this.generateNewQuoteIndex() }) 
  }

  // this.props.classes.container - the classes props gets filled with the styles;
  render() {
    return (
      <Grid className={this.props.classes.container} id="quote-box" justify="center" container> 
        <Grid xs={11} lg={8} item>
          {
            this.selectedQuote ?
          <QuoteMachine selectedQuote={this.selectedQuote} assignNewQuoteIndex={this.assignNewQuoteIndex} /> 
          : null
          }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App); // To get the App component filled with the styles;
