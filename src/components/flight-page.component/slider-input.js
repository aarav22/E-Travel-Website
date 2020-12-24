import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    width: 220,
  },
  input: {
    width: 80,
    color: "white"
  },
});

export default function InputSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(5000);

  useEffect(() => {
    props.maxPriceHandler(value);
  }, [value]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100000) {
      setValue(100000);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Max Price
            </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <svg className="rupee-symbol" width="24px" height="24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8,3H18L17,5H13.74C14.22,5.58 14.58,6.26 14.79,7H18L17,9H15C14.75,11.57 12.74,13.63 10.2,13.96V14H9.5L15.5,21H13L7,14V12H9.5V12C11.26,12 12.72,10.7 12.96,9H7L8,7H12.66C12.1,5.82 10.9,5 9.5,5H7L8,3Z" />
          </svg>
        </Grid>
        <Grid item xs>
          <Slider
            min={1000}
            step={1000}
            max={100000}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            disableUnderline="true"
            onBlur={handleBlur}
            inputProps={{
              step: 1000,
              min: 0,
              max: 100000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
