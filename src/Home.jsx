import "./Home.css"
import sunIcon from "./assets/icon-sun.svg"
import cross from './assets/icon-cross.svg'
import check from './assets/icon-check.svg'
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";

const Home = () => {
const [tasks, setTasks] = useState([]);
const [taskValue, setTaskValue] = useState("");
const [count, setCount] = useState(0);
const [originalTasks, setOriginalTasks] = useState([]);
const [isPressed, setIsPressed] = useState(false);


useEffect(()=>{
    setOriginalTasks(tasks);
}, [tasks])


const handleSubmit = (e)=>{
        e.preventDefault();
        if(taskValue !== ""){
        const newTask= [{id:crypto.randomUUID(),text:taskValue,isDone:false}];
        setTasks(prevTasks=> [...prevTasks,...newTask]);
        setCount(tasks.length+1);
        setTaskValue("");
        }
       
}

const handleDelete = (id)=>{
    const newTasks = tasks.filter(task=> task.id!==id);
    setTasks(newTasks);
    setCount(newTasks.length);
}

const handleDone = (id)=>{
    setTasks(prevTask => prevTask.map( task => task.id ===id  ? {...task, isDone:!task.isDone}: task));
    setCount(prevCount=> prevCount + (tasks.find((task)=>task.id===id)?.isDone? 1 : -1));
}
const handleAll =()=>{
    setIsPressed(prev=> prev===false ? prev : !prev);
    setTasks(tasks);
   
    
}
const handleCompleted =()=>{
    const completedTasks = originalTasks.filter(task => task.isDone === true);
    setOriginalTasks(completedTasks);
    setIsPressed(prev=>!prev);
}



 const textStyle = {
    textDecoration: 'line-through',
    
  };

const checkBoxStyles = {
  
  marginRight: '30px',
  width: '20px',
  height: '20px',
  marginLeft: '30px',
  borderRadius: '50%',
  backgroundImage: `url(${check})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  border: '2px solid gray',
  cursor: 'pointer',
};










    return (  
        <div className="main">
            <header className="header">
                
            </header>
            <div className="overlay">
                <div className="inner-overlay">
                    <div className="div-1">
                        <p>TODO</p>
                        <button className="btn1" ><img src={sunIcon}></img></button>
                    </div>
                    <div className="formDiv">
                        <form onSubmit={(e)=>handleSubmit(e)}>
                            <input type="text" placeholder="Create a new Todo" className="inputTodo" onChange={e=>setTaskValue(e.target.value)}></input> 
                            <button type="submit" className="btn2"><FontAwesomeIcon icon={faCircleDown} size="lg"/></button>
                        </form> 
                    </div>
                    <br>
                    </br>


                    <div className="body-contain">   
                    {isPressed && 
                        originalTasks.map((task)=>( <div className="task-div" key={task.id} onClick={(e)=>console.log(e.target.getAttribute("key"))}>
                            <div className="wrapper-div">
                            {task.isDone ? <div style={checkBoxStyles} onClick={()=>handleDone(task.id)}></div>:<div className="checkbox" onClick={()=>handleDone(task.id)}></div>}
                            {task.isDone ? <p style={textStyle}>{task.text}</p>: <p>{task.text}</p>}
                            </div>
                            <button className="deleteBtn" onClick={()=>handleDelete(task.id)}><img src={cross}></img></button>
                          
                        </div>)
                        
                    )
                    }
                    {
                        !isPressed && tasks.map((task)=>( <div className="task-div" key={task.id} onClick={(e)=>console.log(e.target.getAttribute("key"))}>
                            <div className="wrapper-div">
                            {task.isDone ? <div style={checkBoxStyles} onClick={()=>handleDone(task.id)}></div>:<div className="checkbox" onClick={()=>handleDone(task.id)}></div>}
                            {task.isDone ? <p style={textStyle}>{task.text}</p>: <p>{task.text}</p>}
                            </div>
                            <button className="deleteBtn" onClick={()=>handleDelete(task.id)}><img src={cross}></img></button>
                           
                        </div>)
                        
                    )
                    }

                    <div className="status-div">
                        <div className="left-state-div">
                            <p>{count} items left</p>
                        </div>
                        <div className="lower-btn-div">
                            <button onClick={handleAll}>
                                All
                            </button>
                            <button>
                                Active
                            </button>
                            <button onClick={handleCompleted}>
                                Completed
                            </button>
                        </div>
                        
                        <button className="clear-completed-btn">
                            Clear Completed
                        </button>
                    </div>
                   </div>
                </div>
            </div>
          

        </div>
    );
}
 
export default Home;