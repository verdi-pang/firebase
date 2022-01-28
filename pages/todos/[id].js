import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { getDoc, getDocs, doc, collection } from 'firebase/firestore';
import React from 'react';
import { db } from '../../firebase';
import Link from 'next/link';

//this is the separate page that clicking on the more button on each list item brings to, this page displays the details of each item in the table on the database. Back to home button included to go back to the index.js
const Detail = ({todoProps}) => {
    const todo = JSON.parse(todoProps)
    return (
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{minHeight:'100vh'}}
      >
        <Card sx={{p:3, midWidth:275, maxWidth:500, boxShadow:3}} style={{backgroundColor: '#FAFAFA'}}>
            <CardContent>
                <Typography variant='h5' component='div' sx={{mb:1}}>
                    {todo.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    {todo.detail}
                </Typography>
            </CardContent>
            
            <CardActions>
                <Link href='/'>
                    <Button size='small' variant='contained'>Back to home</Button>
                </Link>
            </CardActions>
        </Card>
      </Grid>
      
  )
}

export default Detail;

export const getStaticPaths = async () => {

    //this will find all the items of the table and map their ids
    const snapshot = await getDocs(collection(db, 'todos'));
    const paths = snapshot.docs.map(doc => {
        return{
            params: { id: doc.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    //this will allow the ids of the table to be collection after the page is being loaded
    const id = context.params.id;

    const docRef = doc(db, 'todos', id);
    const docSnap = await getDoc(docRef);

    return {
        props: { todoProps: JSON.stringify(docSnap.data()) ||null}
    }
}