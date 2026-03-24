let addbtn = document.querySelector('.add-btn')
let todo = document.querySelector('#todo')
let progress = document.querySelector('#progress')
let done = document.querySelector('#done')
const tasks = document.querySelectorAll('.task')
let model = document.querySelector('.model')
let CloseBtn = document.querySelector('#Close')
let addnewbtn = document.querySelector('.New-Btn')
let dragElement = null;
tasks.forEach(task => {
    task.addEventListener('drag', () => {
        dragElement = task;
    })
});

addbtn.addEventListener('click', () => {
    null
});

function DragEvent(column){
    column.addEventListener('dragenter', () => {
        
        column.classList.add('hover-over');
    })
    column.addEventListener('dragleave', () => {
        
        column.classList.remove('hover-over');
    })
    column.addEventListener('dragover', (e) => {
        e.preventDefault()
    })
    column.addEventListener('drop', () => {
        // console.log('hello')
        column.appendChild(dragElement)
        column.classList.remove('hover-over')
    })
};

DragEvent(progress)
DragEvent(todo)
DragEvent(done)

addbtn.addEventListener('click', () => {
    model.classList.add('active')
})

CloseBtn.addEventListener('click', () => {
    console.log('clicked')
    model.classList.remove('active')
})

addnewbtn.addEventListener('click', () => {
    
})