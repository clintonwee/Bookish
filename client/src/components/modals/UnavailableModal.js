import {useEffect, useState} from "react";
import axios from "axios"
import useToken from "../../utils/useToken";
import {RxCross2} from "react-icons/rx"
import Spinner from "../Spinner";
import {formatDate, isDue} from "../../utils/dateFormat";
import ReturnModal from "./ReturnModal";

const UnavailableModal = ({title, author, id, loans, loading, fetchLoans}) => {
    const [open, setOpen] = useState(false)

    const openModal = async () => {
        setOpen(true)
        await fetchLoans(id);
    }

    return (
        <>
            <button
                onClick={openModal}
                className="border border-red-500 hover:bg-red-100 text-red-500 px-4 rounded-lg py-2">Unavailable
            </button>
            <div
                className={`fixed ${!open ? "hidden" : "block"} flex justify-center items-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                id="my-modal`}
            >

                <div
                    className="relative mx-auto p-5 border shadow-lg rounded-md bg-white"
                >
                    <button onClick={() => {
                        setOpen(false)
                    }} className="absolute top-2 right-2 hover:bg-gray-300 rounded-full p-2"><RxCross2/></button>
                    <div className="mt-3 text-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Loans for {title}</h3>
                        <div className="mt-2 px-7 py-3">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No.
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
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
                                        <td className="px-6 py-4">
                                            {index + 1}
                                        </td>
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {loan.first_name} {loan.last_name}
                                        </th>
                                        <td className={`px-6 py-4 ${isDue(loan.due_date) ? 'text-red-600' : 'text-black'}`}>
                                            {formatDate(loan.due_date)}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
export default UnavailableModal