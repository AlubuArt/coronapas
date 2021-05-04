import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const PrimaryButton = withStyles({
    root: {
        background: 'radial-gradient(#e3cf22 40%, #bdab11 90%)',
        borderRadius: 3,
        border: 0,
        color: '#45393d',
        height: 38,
        padding: '0 15px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        marginRight: 10,
        marginTop: 20,
        marginLeft: 10,
        minWidth: 98
      },
      label: {
        textTransform: 'capitalize',
      },
})(Button)

export const SecondaryButton = withStyles({
  root: {
      background: '#736568',
      borderRadius: 3,
      border: 2,
      borderStyle: "solid",
      borderColor: "#e3cf22",
      color: '#e3cf22',
      height: 38,
      padding: '0 15px',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      marginRight: 10,
      marginTop: 20,
      marginLeft: 10,
      minWidth: 98
    },
    label: {
      textTransform: 'capitalize',
    },
})(Button)

