import { IconButton, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material"
import moment from "moment"
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../firebase";
import { TodoContext } from "../pages/TodoContext";
import React, { useContext } from "react";
import { useRouter } from 'next/router';

const Todo = ({ id, timestamp, title, detail }) => {

    const { showAlert, setTodo } = useContext(TodoContext)
    const router = useRouter();

    //deleting document from database using deleteDoc fucntion from firebase using it's id
    const deleteTodo = async (id, e) => {
        e.stopPropagation();
        const docRef = doc(db, "todos", id);
        await deleteDoc(docRef);
        showAlert('error', `Todo with id ${id} deleted successfully`);

    }
    // function to pushing a specific page and locating where it is using it's id 
    const seeMore = (id,e) => {
        e.stopPropagation();
        router.push(`/todos/${id}`)
    }
    return (
        <ListItem onClick={()=> setTodo({ id, title, detail, timestamp})}
            sx={{ mt: 3, boxShadow: 3 }}
            style={{ backgroundColor: '#FAFAFA' }}
            secondaryAction={
                <>
                    <IconButton onClick={e => deleteTodo(id, e)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={e => seeMore(id, e)}>
                        <MoreVertIcon />
                    </IconButton>
                </>
            }
        >
            <ListItemText
                primary={title}
                secondary={moment(timestamp).format("MMMM do, yyyy")}
            />

        </ListItem>

    )
}

export default Todo
