import {useEffect, useState} from "react";
import {formatDate, isDue} from "../../utils/dateFormat";
import axios from "axios";
import useToken from "../../utils/useToken"
import ReturnModal from "../modals/ReturnModal";


const Loans = () => {
    const {prepareHeaders, getProfile} = useToken()
    const [loans, setLoans] = useState([]);

    async function fetchData() {
        const profile = await getProfile()
        const headers = prepareHeaders()
        const res = await axios.get(`/loan/user/${profile.id}`, headers)
        setLoans(res.data)
    }

    useEffect(() => {
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
                        Due Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                </tr>
                </thead>
                <tbody>
                {loans.map((loan, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {loan.title}
                        </th>
                        <td className="px-6 py-4">
                            {loan.author}
                        </td>
                        <td className="px-6 py-4">
                            {loan.genre}
                        </td>
                        <td className={`px-6 py-4 ${isDue(loan.due_date) ? 'text-red-600' : 'text-black'}`}>
                            {formatDate(loan.due_date)}
                        </td>
                        <td className="px-6 py-4">
                            <ReturnModal author={loan.author} title={loan.title} id={loan.id} refetch={fetchData} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Loans