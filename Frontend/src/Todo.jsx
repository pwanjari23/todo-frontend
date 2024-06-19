import { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from 'axios';

function Todo() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateDate, setUpdateDate] = useState('');
    const [tasks, setTasks] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [updateSelectedTaskId, setUpdateSelectedTaskId] = useState(null);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setDeleteModal(false);
        setEditModal(false);
        setSelectedTask(null);
        setUpdateTitle("");
        setUpdateDate("")
        setUpdateSelectedTaskId(null);
    };

    const handleDeleteModal = (task) => {
        setSelectedTask(task);
        setDeleteModal(true);
    };

    const handleEditModal = (task) => {
        setEditModal(true);
        console.log(task, "task");
        setUpdateTitle(task.title);
        setUpdateDate(task.date)
        setUpdateSelectedTaskId(task.id);
    };

    let todoObj = {
        title: title,
        date: date
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let todoData = await axios.get('http://localhost:4000/todos');
        setTasks(todoData.data);
    };

    const createTodo = async (e) => {
        e.preventDefault();
        let todoData = await axios.post('http://localhost:4000/todos', todoObj);
        setTasks([...tasks, todoData.data]);
        setOpenModal(false);
        setTitle('');
        setDate('');
    };

    const deleteTodo = async () => {
        if (selectedTask) {
            await axios.delete(`http://localhost:4000/todos/${selectedTask.id}`);
            setTasks(tasks.filter(task => task.id !== selectedTask.id));
            handleCloseModal();
        }
    };

    const editTodo = async () => {
        let updateTodoData = {
            "title": updateTitle,
            "date": updateDate
        }
        console.log(updateTodoData, "updateTodoData");
        let updateCall = await axios.put(`http://localhost:4000/todos/${updateSelectedTaskId}`, updateTodoData);
        console.log(updateCall, "updatecall");
        let updateTodoList = tasks.filter(task => task.id !== updateSelectedTaskId);
        setTasks([...updateTodoList, updateCall.data])
        setUpdateTitle("");
        setUpdateDate("")
        setUpdateSelectedTaskId(null);
        handleCloseModal()
    }


    return (
        <div className='flex items-center justify-center min-h-screen from-blue-200 via-blue-500 to-blue-700 bg-gradient-to-br'>
            <div className='relative w-[630px] h-[450px] px-8 py-8 mx-auto bg-white rounded-lg shadow-xl flex flex-col'>
                <h1 className="text-3xl font-serif font-bold mb-4">Todo List:</h1>
                <button type="button" className="absolute top-0 right-4 mt-8 ml-2 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg" onClick={handleOpenModal}>Add</button>
                <div className='overflow-y-auto scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-width-5 scrollbar-height-5'>
                    {tasks.length === 0 && (
                        <div className='flex items-center justify-center flex-1'>
                            <h1 className="text-xl font-serif font-semibold mb-16 text-center">Click 'Add' to create your to-do and<br /> make it happen!</h1>
                        </div>
                    )}
                    {tasks.length > 0 && (
                        <div className='flex flex-col space-y-4 mt-4'>
                            {tasks.map((task, index) => (
                                <div key={index} className='flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm'>
                                    <div>
                                        <h2 className="text-md font-semibold">{task.title}</h2>
                                        <p className="text-sm text-gray-600">{task.date}</p>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <button onClick={() => handleDeleteModal(task)}>
                                            <MdDelete fontSize={20} />
                                        </button>
                                        <button onClick={() => handleEditModal(task)}>
                                            <MdEdit fontSize={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {openModal && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                            <div className='relative w-[450px] h-[300px] px-4 py-4 mx-auto bg-white rounded-lg shadow-xl flex flex-col'>
                                <h1 className="text-xl font-serif font-semibold mb-4">Create Todo</h1>
                                <button type="button" className="absolute top-0 right-2 mt-2 ml-2 px-3 py-2 text-xl text-center" onClick={handleCloseModal}>
                                    <IoClose />
                                </button>
                                <form className="space-y-4 w-full">
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                                        <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                    </div>
                                    <div>
                                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                                        <input type="date" id="date" name="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" value={date} onChange={(e) => setDate(e.target.value)} required />
                                    </div>
                                    <button type="button" className="absolute bottom-8 right-4 mt-2 ml-2 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg" onClick={(e) => createTodo(e)}>Add</button>
                                </form>
                            </div>
                        </div>
                    )}
                    {deleteModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-lg font-medium mb-4">Are you sure you want to delete this item?</p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={handleCloseModal}
                                        className="bg-gray-200 text-gray-800 text-xs px-4 py-2 rounded hover:bg-gray-300 focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={deleteTodo}
                                        className="bg-red-600 text-white px-4 text-xs py-2 rounded hover:bg-red-700 focus:outline-none"
                                    >
                                        Yes, I'm sure
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {editModal && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                            <div className='relative w-[450px] h-[300px] px-4 py-4 mx-auto bg-white rounded-lg shadow-xl flex flex-col'>
                                <h1 className="text-xl font-serif font-semibold mb-4">Edit Todo</h1>
                                <button type="button" className="absolute top-0 right-2 mt-2 ml-2 px-3 py-2 text-xl text-center" onClick={handleCloseModal}>
                                    <IoClose />
                                </button>
                                <form className="space-y-4 w-full">
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Edit Title</label>
                                        <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter title" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} required />
                                    </div>
                                    <div>
                                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                                        <input type="date" id="date" name="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" value={updateDate} onChange={(e) => setUpdateDate(e.target.value)} required />
                                    </div>
                                    <button type="button" className="absolute bottom-8 right-4 mt-2 ml-2 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg" onClick={editTodo}>Save</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default Todo;
