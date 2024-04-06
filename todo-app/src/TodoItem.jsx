export default function TodoItem(props){
    return(
        <div>
           <div className="todo-list">
            <div className="todo-list-item"> 
             <div>
                <h3>{props.addList(item.title)}</h3>
                <p>{props.addList(item.description)}</p>
                
             </div>
            </div>
           </div>
        </div>
    )
}