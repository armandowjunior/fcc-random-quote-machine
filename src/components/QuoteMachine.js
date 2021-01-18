import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'; // Import from material UI to change the font to roboto
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

// Use React.Fragment to return just only one component or html element;

const QuoteMachine = (props) => { // We could use object destructuring to not use props!
    return (
    <React.Fragment> 
        <Card>
            <CardContent>
                <Typography id="text">
                {props.selectedQuote.quote} - <span id="author">{props.selectedQuote.author}</span>
                </Typography>
            </CardContent>
            <CardActions>
                <Button id="new-quote" size="small" onClick={props.assignNewQuoteIndex}>Next Quote</Button>
                <IconButton 
                    id="tweet-quote"
                    target="_blank"
                    href={encodeURI(`https://twitter.com/intent/tweet?text=${props.selectedQuote.quote}`)}
                >
                    <FontAwesomeIcon icon={faTwitter} size="md"></FontAwesomeIcon>
                </IconButton>
            </CardActions>
        </Card>
    </React.Fragment>
);
};

export default QuoteMachine