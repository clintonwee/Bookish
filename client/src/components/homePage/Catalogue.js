import {useEffect, useState} from "react";
import prepareHeaders from "../../utils/prepareHeaders"
import useToken from "../../utils/useToken";
import axios from "axios";
import ConfirmModal from "../modals/ConfirmModal";
import ReturnModal from "../modals/ReturnModal";
import UnavailableModal from "../modals/UnavailableModal";

const Catalogue = ({books, fetchData, currPage}) => {
    const {token, prepareHeaders, getProfile} = useToken();
    const [loans, setLoans] = useState([])
    const [loansLoading, setLoansLoading] = useState(false)

    const fetchLoans = async (id) => {
        setLoansLoading(true)
        const headers = prepareHeaders()
        const resLoans = await axios.get(`/loan/book/${id}`, headers)
        setLoans(resLoans.data)
        setLoansLoading(false)
    }

    return (
        <div className="relative overflow-x-auto flex justify-center">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        No.
                    </th>
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
                        <td className="px-6 py-4">
                            { (currPage - 1) * 10 + index + 1}
                        </td>
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
                            {book.borrowed ? <ReturnModal refetch={fetchData} title={book.title} author={book.author}
                                                          id={book.loan_id}/> : book.available ?
                                <ConfirmModal refetch={fetchData} title={book.title} author={book.author}
                                              id={book.id}/> :
                                <UnavailableModal title={book.title} author={book.author} id={book.id} loans={loans}
                                                  loading={loansLoading} fetchLoans={fetchLoans}/>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default Catalogue