const Todo = (() => {
    const tasks = [];

    const addTask = (task) => {
        tasks.push({ task, completed: false });
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
    };

    const toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
    };

    const getTasks = () => tasks;

    return { addTask, removeTask, toggleTask, getTasks };
})();

export default Todo;
