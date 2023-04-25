import React, {useState} from "react";
import Navbar from "../Layout/Navbar";
import axios from "axios";
import useToken from "../../utils/useToken";
import Spinner from "../Spinner";

const CreatePage = () => {
    const {prepareHeaders} = useToken()
    const [isLoading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const onSubmit = async (e) => {
        setLoading(true)
        setError(false)
        setSuccess(false)
        e.preventDefault();
        const {title, author, isbn, genre, total} = e.currentTarget.elements;
        const reqBody = {
            title: title.value,
            author: author.value,
            genre: genre.value,
            isbn: isbn.value,
            total: total.value,
            available: total.value
        }
        const headers = prepareHeaders();
        try {
            const res = await axios.post("/book", reqBody, headers)
            if (res.data.status !== "error") {
                setSuccess(true)
            }
        } catch (e) {
            console.log(e)
            setError(true)
        }

        setLoading(false)
    }
    return (
        <div className="min-h-screen flex flex-col items-center">
            <Navbar/>
            <div className="w-3/4 md:w-2/5 mt-10 bg-gray-100 shadow-lg px-4 py-4 rounded-lg">
                <p className="text-2xl mb-4">New Book</p>
                <form className="w-full flex flex-col" onSubmit={onSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="title" id="title"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Animal Farm" required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="author"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                        <input type="text" id="author"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="George Orwell" required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="isbn"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ISBN</label>
                        <input type="text" id="isbn"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="5689" required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="total"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of
                            Books</label>
                        <input type="number" id="total"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="20" min={0} required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="genre"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a
                            genre</label>
                        <select id="genre"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="Horror">Horror</option>
                            <option value="Romance">Romance</option>
                            <option value="Children">Children</option>
                            <option value="Action">Action</option>
                        </select>
                    </div>
                    <div className="flex flex-col md:flex-row items-center">
                        <button type="submit"
                                className="text-white mb-2 md:mb-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ?
                            <Spinner/> : "Create"}
                        </button>
                        {success && <p className="ml-3 text-green-500">Book successfully created!</p>}
                        {error && <p className="ml-3 text-red-500">Something went wrong...</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePage

