import React, { useEffect, useState } from 'react';
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

function App({classes}) {
  
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null);

  useEffect( async () => {
    const data = await fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
    const quotes = await data.json();
    setQuotes(quotes);
    setSelectedQuoteIndex(Math.floor(Math.random() * quotes.length))
  }, []);

  function getSelectedQuote() { // the get makes that the function may be called as an variable
    if (!quotes.length || !Number.isInteger(selectedQuoteIndex)) {
      return undefined;
    }
    return quotes[selectedQuoteIndex];
  }

  function generateNewQuoteIndex() {
    if (!quotes.length) {
      return undefined;
    }
    return Math.floor(Math.random() * quotes.length); // could use lodash
  }

  function assignNewQuoteIndex() {
    setSelectedQuoteIndex(generateNewQuoteIndex());
  }

  // this.props.classes.container - the classes props gets filled with the styles;
  return (
    <Grid className={classes.container} id="quote-box" justify="center" container> 
      <Grid xs={11} lg={8} item>
        {
          getSelectedQuote() ?
        <QuoteMachine selectedQuote={getSelectedQuote()} assignNewQuoteIndex={assignNewQuoteIndex} /> 
        : null
        }
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(App); // To get the App component filled with the styles;
