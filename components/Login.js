import { Button, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from '../firebase';
import { signInWithPopup } from '@firebase/auth';

//this is the login component which is called in the index.js to be loaded before everything
const Login = ({type, color}) => {
  const loginWithGoogle = () => {
    signInWithPopup(auth,provider)
  }
  return (
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{minHeight: '100vh'}}
    >
        <Button variant='contained' startIcon={<GoogleIcon/>}
        onClick={loginWithGoogle}
        >Sign in Google</Button>
    
    </Grid>
  )
};

export default Login;
