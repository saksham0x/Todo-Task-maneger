let addbtn = document.querySelector('.add-btn')
let todo = document.querySelector('#todo')
let progress = document.querySelector('#progress')
let done = document.querySelector('#done')
let model = document.querySelector('.model')
let CloseBtn = document.querySelector('#Close')
let addnewbtn = document.querySelector('#New-Btn')
let dragElement = null;

let cols = [todo, progress, done]

// 🔥 Load from localStorage
let taskData = JSON.parse(localStorage.getItem("tasks")) || {}

// 👉 Load UI
function loadTasks(){
    cols.forEach(col => {
        col.querySelectorAll('.task').forEach(t => t.remove())
    })

    for(let col in taskData){
        let column = document.querySelector(`#${col}`)

        taskData[col].forEach(task => {
            let div = document.createElement('div')
            div.classList.add('task')
            div.setAttribute("draggable","true")

            div.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.desc}</p>
                <button>delete</button>
            `

            column.appendChild(div)

            // ✅ FIX
            div.addEventListener('dragstart', () => {
                dragElement = div
            })
        })
    }

    updateCount()
}

loadTasks()

// 🔥 Save + Count update
function updateCount(){
    cols.forEach(col => {
        const tasks = col.querySelectorAll('.task')
        let count = col.querySelector('#count')

        taskData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector('h2').innerText,
                desc: t.querySelector('p').innerText
            }
        })

        count.innerText = tasks.length
    })

    localStorage.setItem("tasks", JSON.stringify(taskData))
}

// 🔥 Drag events (FULL FIX)
function DragEvent(column){

    column.addEventListener('dragenter', () => {
        column.classList.add('hover-over')
    })

    column.addEventListener('dragleave', () => {
        column.classList.remove('hover-over')
    })

    column.addEventListener('dragover', (e) => {
        e.preventDefault()
    })

    column.addEventListener('drop', () => {
        column.appendChild(dragElement)
        column.classList.remove('hover-over')
        updateCount()
    })
}

DragEvent(todo)
DragEvent(progress)
DragEvent(done)

// 🔥 Add task
addnewbtn.addEventListener('click', () => {
    const title = document.querySelector('#new-title').value
    const desc = document.querySelector('#New-Des').value

    if(!title) return

    let div = document.createElement('div')
    div.classList.add('task')
    div.setAttribute("draggable","true")

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>delete</button>
    `

    todo.appendChild(div)

    // ✅ FIX
    div.addEventListener('dragstart', () => {
        dragElement = div
    })

    model.classList.remove('active')

    updateCount()
})

// 🔥 Delete
document.addEventListener('click', (e)=>{
    if(e.target.innerText === "delete"){
        e.target.parentElement.remove()
        updateCount()
    }
})

// 🔥 Modal (FIXED)
addbtn.addEventListener('click', () => {
    model.classList.add('active')
})

CloseBtn.addEventListener('click', () => {
    model.classList.remove('active')
})