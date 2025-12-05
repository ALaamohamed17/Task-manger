// OOP Classes

// JSON

// LocalStorage

// CRUD operations

// Handling arrays + filtering



class Task{
    constructor(id, title, describtion ,isDone=false){
        this.id =id
        this.title=title
        this.describtion=describtion
        this.isDone=isDone
    }
    toggle(){
        this.isDone =!this.isDone
    }
    getinfo(){
        return `${this.title} - ${this.isDone ? "✓ Completed" : "❌ Pending"}`;
    }
}

class TaskManger{
    constructor(){
        this.tasks=[]
    }
    addTask(title , describtion){
        const id =  Data.now()
        const newTask = new Task(id ,title ,describtion)
        this.tasks.push(newTask)
        this.saveToStorage();
        return newTask
    }
    removeTask(id){
        this.tasks = this.tasks.filter(task=> task.id !== id)
        // this.saveToStorage();
    }
    toggleComplete(id){
        const task = this.tasks.find(task => task.id ==id)
        if(task){
            task.toggle()
            this.saveToStorage();
        }
    }
    saveToStorage(){
        localStorage.setItem("tasks",JSON.stringify(this.tasks))
    }
    loadFromStorage(){
        const  data = JSON.parse(localStorage.getItem("tasks"))
        this.tasks = data.map(t=> new Task(t.id, t.title, t.description, t.isDone))
    }
    listTasks(){
        return this.tasks.map(t => t.getInfo());
    }
}


const manager = new TaskManger();
manager.loadFromStorage()

manager.addTask("Study JS", "Finish OOP section");
manager.addTask("Workout", "Run for 20 minutes");

console.log(manager.listTasks());

manager.toggleComplete(manager.tasks[0].id);

console.log(manager.listTasks());