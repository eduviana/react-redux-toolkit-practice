import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";


const TasksForm = () => {
  
  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector( state => state.tasks );

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(params.id) {
      dispatch(editTask(task))
    }


    dispatch(addTask({
      ...task,
      id: uuid(),
    })) //agrego una tarea nueva al state pero esta tarea no tiene id.
    navigate('/');
  }

  useEffect(() => {
    if(params.id) {
      setTask(tasks.find(task => task.id === params.id))
    }
  }, [params.id, tasks])
  

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label htmlFor="title" className="block text-sm font-bold mb-2">Task:</label>
      <input type="text" name="title" className="w-full p-2 rounded-md bg-zinc-600 mb-2" value={task.title} placeholder="title" onChange={handleChange} />

      <label className="block text-xs font-bold mb-2" htmlFor="description"></label>
      <textarea name="description" value={task.description} className="w-full p-2 rounded-md bg-zinc-600 mb-2" placeholder="description" onChange={handleChange}></textarea>
      <button type="submit" className="bg-indigo-600 px-3 py-2 w-1/2 mx-auto block">Save</button>
    </form>
  );
};

export default TasksForm;
