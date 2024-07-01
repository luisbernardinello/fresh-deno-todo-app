import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { useEffect, useState } from "preact/hooks";
import { CheckIcon, CrossIcon, EditIcon, TrashIcon } from "../components/SVGs.tsx";

interface TODOS {
    _id: string;
    todo: string;
    status: number;
}

function Todos() {
    const [todo, setTodo] = useState("");
    const [getTodos, setGetTodos] = useState<TODOS[] | undefined>();
    const [showEdit, setShowEdit] = useState(false);
    const [editTodoId, setEditTodoId] = useState("");

    const AddTodo = async () => {
        try {
            const response = await axiod.post('/api/todos', {
                todo: todo,
                status: 0
            });
            if (response.status === 201) {
                await fetchTodos();
                setTodo("");
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const fetchTodos = async () => {
        try {
            const response = await axiod.get("/api/todos");
            setGetTodos(response.data);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const editTodo = async (todoData: any) => {
        try {
            const response = await axiod.put("/api/todos", {
                id: todoData._id,
                text: todo === "" ? todoData.todo : todo,
            });
            if (response.status === 200) {
                await fetchTodos();
                setShowEdit(false);
                setEditTodoId("");
                setTodo("");
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const removeTodo = async (todoId: string) => {
        try {
            const response = await axiod.delete("/api/todos", {
                id: todoId
            });
            if (response.status === 200) {
                await fetchTodos();
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const isCompleted = async (todo: TODOS) => {
        try {
            const newStatus = todo.status === 0 ? 1 : 0;
            const response = await axiod.patch("/api/todos", {
                id: todo._id,
                status: newStatus
            });
            if (response.status === 200) {
                await fetchTodos();
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <>
            <div class="mt-10 mx-auto max-w-sm w-full">
                <div class="flex items-center gap-4">
                    <input
                        id="todo"
                        name="todo"
                        type="text"
                        placeholder="Enter new Todo..."
                        required
                        class="w-full rounded-md py-1.5 px-3.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                        onChange={(e: any) => setTodo(e.target.value)}
                        value={todo}
                    />
                    <button onClick={AddTodo} class="px-4 py-2 rounded-md bg-lime-600 text-white text-sm font-medium hover:bg-lime-800">
                        <CheckIcon />
                    </button>
                </div>
            </div>
            <div class="mt-10">
                {
                    getTodos && getTodos.map((todo: TODOS) => {
                        return (
                            <div
                                key={todo._id}
                                class={`mb-5 h-12 rounded-md ${todo.status === 0 ? "bg-gray-50" : "bg-green-300"} flex justify-between items-center`}
                            >
                                <p className="px-6">{todo.todo}</p>
                                <div class="flex items-center gap-2">
                                    {editTodoId !== todo._id && (
                                        <button
                                            onClick={() => {
                                                setShowEdit(true);
                                                setEditTodoId(todo._id);
                                            }}
                                            class="px-4 py-2 rounded-md bg-lime-500 text-white text-sm font-medium hover:bg-lime-700"
                                        >
                                            <EditIcon />
                                        </button>
                                    )}

                                    {showEdit && editTodoId === todo._id && (
                                        <div class="flex items-center gap-4">
                                            <input
                                                id="todo"
                                                name="todo"
                                                type="text"
                                                placeholder="Enter new Todo..."
                                                required
                                                class="w-full rounded-md py-1.5 px-3.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                                onChange={(e: any) => setTodo(e.target.value)}
                                                value={todo.todo}
                                            />
                                            <button
                                                onClick={() => editTodo(todo)}
                                                class="px-4 py-2 rounded-md bg-lime-600 text-white text-sm font-medium hover:bg-lime-800"
                                            >
                                                <CheckIcon />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowEdit(false);
                                                    setEditTodoId("");
                                                }}
                                                class="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-800"
                                            >
                                                <CrossIcon />
                                            </button>
                                        </div>
                                    )}

                                    <button onClick={() => removeTodo(todo._id)} class="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-800">
                                        <TrashIcon />
                                    </button>
                                    <button onClick={() => isCompleted(todo)} class="px-4 py-2 rounded-md bg-lime-500 text-white text-sm font-medium hover:bg-lime-700">
                                        <CheckIcon />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default Todos;
