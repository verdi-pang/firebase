import { TextField, Button } from '@mui/material';
import { addDoc, serverTimestamp, collection, updateDoc, doc } from 'firebase/firestore';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { useAuth } from '../Auth';
import { db } from "../firebase"
import { TodoContext } from '../pages/TodoContext';

const TodoForm = () => {
    const inputAreaRef = useRef()
    const {currentUser} = useAuth();
    const {showAlert, todo, setTodo} = useContext(TodoContext)
    const onSubmit = async() => {
        if (todo?.hasOwnProperty('timestamp')){
            //update the todo if a timestamp exists
            const docRef = doc(db, "todos", todo.id);
            const todoUpdate = { ...todo, timestamp: serverTimestamp()}
            updateDoc(docRef, todoUpdate)
            setTodo({ title:'', detail:''});
            showAlert('info', `Todo with id ${todo.id} updated successfully`)
        }else{
            //adding a new todo
            const collectionRef = collection(db, "todos")
            const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email, timestamp: serverTimestamp()})
            setTodo({title:'', detail: ''})
            showAlert('success',`Todo with id ${docRef.id} is added successfully`)
        }
        
        
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (!inputAreaRef.current.contains(e.target)) {
                // clicked on anywhere that is not the input area and setting the input area content either to be empty or be of the target that is clicked
                console.log('Outside input area');
                setTodo({ title: '', detail: '' })

            } else {
                console.log('Inside input area');
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [])

    

  return (
      <div ref={inputAreaRef}>
        <TextField fullWidth label="title" margin="normal" 
        value={todo.title}
        onChange={e=>setTodo({...todo,title:e.target.value})}
        />
        <TextField fullWidth label="detail" multiline maxRows={4}
        rows={4} 
        value={todo.detail}
        onChange={e=>setTodo({...todo,detail:e.target.value})}
        />
        <Button onClick={onSubmit} variant='contained' sx={ {mt: 3} }>{todo.hasOwnProperty('timestamp')?'Update' : 'Add'}</Button>
      </div>
      )
}

export default TodoForm;
