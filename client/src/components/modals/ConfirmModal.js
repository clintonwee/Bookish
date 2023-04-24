import {useState} from "react";
import axios from "axios"
import useToken from "../../utils/useToken";
import {RxCross2} from "react-icons/rx"

const ConfirmModal = ({title, author, id}) => {
    const [open, setOpen] = useState(false)
    const {prepareHeaders, getProfile} = useToken()

    const openModal = () => {
        setOpen(true)
    }

    const createLoan = async() => {
        const headers = prepareHeaders();
        const profile = await getProfile()
        console.log(profile)
        const reqBody =  {
            user_id: profile.id,
            book_id: id
        }
        const res = await axios.post("/loan", reqBody, headers)
        setOpen(false)
        console.log(res)
    }
    return (
        <>
            <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded-lg py-2">Borrow
            </button>
            <div
                className={`fixed ${!open ? "hidden" : "block"} flex justify-center items-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                id="my-modal`}
            >

                <div
                    className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
                >
                    <button onClick={() => {setOpen(false)}} className="absolute top-2 right-2 hover:bg-gray-300 rounded-full p-2"><RxCross2/></button>
                    <div className="mt-3 text-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Confirmation</h3>
                        <div className="mt-2 px-7 py-3">
                            <p className="text-sm text-gray-500">
                                Are you sure you wish to borrow {title} by {author}?
                            </p>
                        </div>
                        <div className="items-center px-4 py-3">
                            <button
                                id="ok-btn"
                                onClick={createLoan}
                                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ConfirmModal