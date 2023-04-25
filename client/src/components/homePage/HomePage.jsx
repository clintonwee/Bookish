import React, {useEffect, useState} from "react";
import Navbar from "../Layout/Navbar";
import Catalogue from "./Catalogue";
import SearchBar from "./SearchBar";
import axios from "axios";
import useToken from "../../utils/useToken";

const HomePage = () => {
    const {token, prepareHeaders, getProfile} = useToken();
    const [search, setSearch] = useState("")
    const [books, setBooks] = useState([])


    const fetchData = async () => {
        const headers = prepareHeaders()
        const profile = await getProfile()

        const resLoans = await axios.get(`/loan/user/${profile.id}`, headers)
        const bookIds = resLoans.data.map((loan) => loan.book_id)
        const loanIds = resLoans.data.map((loan) => loan.id)

        const resBooks = await axios.get(`/books?search=${search}`, headers)
        const books = resBooks.data.books.map((book) => {
            const index = bookIds.indexOf(book.id)
            if (index != -1) {
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
        <div className="min-h-screen flex flex-col items-center">
            <Navbar/>
            <div className="w-1/2 mt-10 bg-gray-100 shadow-lg px-4 md:px-10 py-4 md:py-10 rounded-lg">
                <p className="text-2xl mb-4">Catalogue</p>
                <div className="mb-4">
                    <SearchBar setSearch={setSearch} fetchData={fetchData}/>
                </div>
                <Catalogue books={books} search={search} fetchData={fetchData}/>
            </div>
        </div>
    );
}

export default HomePage
