import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: '1rem',
    maxWidth: '600px',
    margin: 'auto',
    padding: theme.spacing.unit * 2
  },
  textField: {
    width: '100%'
  }
});

const mins = str => {
  const [shour, smin] = str.split(':')
  return Number(shour) * 60 + Number(smin)
}

class App extends Component {
  state={
    start: '08:30',
    end: '09:30'
  }

  getDifference = () => {
    const { start, end } = this.state
    const difference = mins(end) - mins(start)
    const hours = parseInt(difference / 60)
    const minutes = difference % 60
    return `${hours} hour(s) and ${minutes} minute(s)`
  }

  updateTime = ({ target }) => this.setState({ [target.id]: target.value })

  copyToClipboard = () => {
    const dummy = document.createElement('input');
    document.body.appendChild(dummy)
    dummy.value = this.getDifference()
    dummy.select()
    document.execCommand('copy')
    dummy.remove()
  }

  render() {
    const { classes } = this.props
    const { start, end } = this.state
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Naptimer
          </Typography>
          <TextField
            id="start"
            label="Started"
            type="time"
            value={start}
            className={classes.textField}
            onChange={this.updateTime}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <TextField
            id="end"
            label="Ended"
            type="time"
            value={end}
            className={classes.textField}
            onChange={this.updateTime}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <p>
            Bubzilla napped for
            <b> {this.getDifference()}</b>
            !
          </p>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.copyToClipboard}
          >
            Copy to Clipboard
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
