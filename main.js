document.addEventListener("DOMContentLoaded", function () {
    const taskTitle = document.getElementById('taskTitle');
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskListContainer = document.getElementById("taskListContainer");

    addBtn.addEventListener("click", function () {
        const title = taskTitle.value.trim();
        const body = taskInput.value.trim();

        if (title && body) {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    title: title,
                    body: body
                })
            })
                .then(response => response.json())
                .then(data => {
                    const taskList = document.createElement("div");
                    taskList.className = 'taskList';

                    const titleItem = document.createElement("p");
                    titleItem.className = 'titleItemInput';
                    titleItem.textContent = data.title;

                    const listItem = document.createElement("p");
                    listItem.className = 'listItemInput';
                    listItem.textContent = data.body;

                    taskList.appendChild(titleItem);
                    taskList.appendChild(listItem);
                    taskListContainer.appendChild(taskList);

                    taskTitle.value = "";
                    taskInput.value = "";
                    console.log('Запрос успешно отправлен!');
                })
                .catch(error => console.error('Ошибка. Запрос не выполнен:', error));
        }
    });
});