{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        // alternative code:
        // tasks = tasks.map(({ done }, currentIndex) => currentIndex === taskIndex ? !done : done);
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        // alternative code:
        // tasks = tasks.filter((element, index) => index !== taskIndex)
        render();
    };

    const hideShowDoneTask = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const toggleAllTaskDone = () => {
        tasks = tasks.map((tasks) => ({
            ...tasks,
            done: true,
        }));
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        let listOfTasksHTMLContent = "";

        for (const task of tasks) {
            listOfTasksHTMLContent += `
                <li
                  class="tasks__item js-task"
                >
                  <button class="tasks__button tasks__button--done js-done">
                    ${task.done ? "✓" : ""}
                  </button>
                  <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                    ${task.content}
                  </span> 
                  <button class="tasks__button tasks__button--remove js-remove">
                    🗑
                  </button>
                </li>
              `;
            }

        document.querySelector(".js-tasks").innerHTML = listOfTasksHTMLContent;
    };

    const renderButtons = () => {
        let buttonsHTMLContent = "";

        if (tasks.length !== 0) {
            buttonsHTMLContent = `
            <button 
                class="section__header--button js-hideShowDoneTask"
                ${tasks.some(({ done }) => done) ? "" : "disabled"}>
                    ${hideDoneTasks === true ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button 
                class="section__header--button js-toggleAllDoneTask"${tasks.every(({ done }) => done) ? "disabled" : ""}>
                    Ukończ wszystkie
            </button>
            `;
        } else if (tasks.length === 0) {
            buttonsHTMLContent = ``;
        }

        document.querySelector(".js-buttons").innerHTML = buttonsHTMLContent;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onformdSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onformdSubmit);
    };

    init();
}

