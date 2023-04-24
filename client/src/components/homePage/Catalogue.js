import {useEffect, useState} from "react";
import prepareHeaders from "../../utils/prepareHeaders"
import useToken from "../../utils/useToken";
import axios from "axios";

const Catalogue = () => {
    const {token, prepareHeaders} = useToken();
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const headers = prepareHeaders()
            const res = await axios.get("/books", headers)
            setBooks(res.data.books)
        }
        fetchData()

    }, [])

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Author
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Genre
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                </tr>
                </thead>
                <tbody>
                {books.map((book, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {book.title}
                        </th>
                        <td className="px-6 py-4">
                            {book.author}
                        </td>
                        <td className="px-6 py-4">
                            {book.genre}
                        </td>
                        <td className="px-6 py-4">
                            {book.available ? <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded-lg py-2">Borrow</button> :
                                <button
                                    className="border border-red-500 hover:bg-red-100 text-red-500 px-4 rounded-lg py-2">Unavailable</button>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default Catalogue