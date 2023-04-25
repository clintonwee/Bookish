import {useEffect, useState} from "react";
import prepareHeaders from "../../utils/prepareHeaders"
import useToken from "../../utils/useToken";
import axios from "axios";
import ConfirmModal from "../modals/ConfirmModal";
import ReturnModal from "../modals/ReturnModal";
const Catalogue = () => {
    const {token, prepareHeaders, getProfile} = useToken();
    const [books, setBooks] = useState([]);
    const [loans, setLoans] = useState([])
    const [borrowedBookIds, setBorrowedBookIds] = useState([])

     const fetchData = async () => {
            const headers = prepareHeaders()
            const profile = await getProfile()

            const resLoans = await axios.get(`/loan/user/${profile.id}`, headers)
            const bookIds = resLoans.data.map((loan) => loan.book_id)
            const loanIds = resLoans.data.map((loan) => loan.id)

            const resBooks = await axios.get("/books", headers)
            const books = resBooks.data.books.map((book) => {
                const index = bookIds.indexOf(book.id)
                if(index != -1){
                    book.borrowed = true;
                    book.loan_id = loanIds[index];
                } else {
                    book.borrowed = false
                    book.loan_id = -1
                }
                return book;
            })

            setBooks(resBooks.data.books)
        }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="relative overflow-x-auto flex justify-center">
            <table className="w-full md:w-3/4 text-sm text-left text-gray-500 dark:text-gray-400">
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
                        <td className="px-6 py-4 flex justify-center">
                            {book.borrowed ? <ReturnModal refetch={fetchData} title={book.title} author={book.author} id={book.loan_id}/> : book.available ? <ConfirmModal refetch={fetchData} title={book.title} author={book.author} id={book.id}/> :
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