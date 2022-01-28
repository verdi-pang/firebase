import { Alert, Avatar, Container, IconButton, Snackbar, Typography, Shadows, Button } from '@mui/material'
import { useState } from 'react';
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { TodoContext } from './TodoContext';
// import Loading from '../components/Loading';
// import Login from '../components/Login';
import { useAuth } from '../Auth';
import { auth, db } from '../firebase';
import { Box } from '@mui/system';
import { verifyIdToken } from '../firebaseAdmin';
import nookies from 'nookies';
import { collection, getDocs, orderBy, query, where } from '@firebase/firestore';

export default function Home({ todosProps }) {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [todo, setTodo] = useState({title:'', detail:''})
  const showAlert = (type,msg) => {
    setAlertType(type);
    setAlertMessage(msg);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <TodoContext.Provider value={{ showAlert, todo, setTodo }}>
      <Container sx={{ boxShadow: 1, p:1, mt: 1, borderRadius:2}} style={{ backgroundColor: '#FFF' }} maxWidth="sm" >
        <Box 
        sx={{ 
          display: 'flex', 
          justifyContent:'flex-end',
          alignContent:'flex-start'
        }}
        mt={2}
        >
          
          <Typography mt={1}>
            Logged in as: 
          </Typography>
          <Button variant='text' sx={{pt:1}} onClick={()=>auth.signOut()}>
            {currentUser.displayName}
          </Button>
          
        </Box>
        <Typography variant='h5' mt={1}>Enter your To Do Items</Typography>
        <TodoForm />
          <Snackbar
            anchorOrigin={{vertical:'bottom', horizontal:'center'}}
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
          >
            <Alert 
              onClose={handleClose} 
              severity={alertType} 
              sx={{ width: '100%' }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        <TodoList todosProps = {todosProps} />
      </Container>
    </TodoContext.Provider>
  )
}

export async function getServerSideProps(context) {

  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    const collectionRef = collection(db, "todos")
    const q = query(collectionRef, where("email", "==", email), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    let todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime() });
    });
    return {

      props: {
        todosProps: JSON.stringify(todos) || [],

      }
    };
  } catch (error) {
    return { props: {} };
  }



}