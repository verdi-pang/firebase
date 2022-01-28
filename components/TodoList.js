import { collection, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { db } from "../firebase";
import Todo from "./Todo";

const TodoList = () => {
    const [todos, setTodos] = useState([])
    const { currentUser } = useAuth();
    useEffect(() => {
        const collectionRef = collection(db, "todos")

        //this query looks thru the table and only takes what matches the info entered, which is by the index of email and time
        const q = query(collectionRef, where('email','==', currentUser?.email), orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setTodos(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
        });
        return unsubscribe;


    }, [])
    return (
        <div id='todo-list'>
            {todos.map(todo => <Todo key={todo.id}
                id={todo.id}
                title={todo.title}
                detail={todo.detail}
                timestamp={todo.timestamp}

            />)}
        </div>
    )
}

export default TodoList
