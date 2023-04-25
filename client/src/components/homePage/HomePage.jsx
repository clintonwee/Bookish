import React, {useEffect, useState} from "react";
import Navbar from "../Layout/Navbar";
import Catalogue from "./Catalogue";
import SearchBar from "./SearchBar";
import axios from "axios";
import useToken from "../../utils/useToken";
import Pagination from "./Pagination";

const HomePage = () => {
    const {token, prepareHeaders, getProfile} = useToken();
    const [search, setSearch] = useState("")
    const [books, setBooks] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)


    const fetchData = async () => {
        const headers = prepareHeaders()
        const profile = await getProfile()

        const resLoans = await axios.get(`/loan/user/${profile.id}`, headers)
        const bookIds = resLoans.data.map((loan) => loan.book_id)
        const loanIds = resLoans.data.map((loan) => loan.id)

        const resBooks = await axios.get(`/books?page=${currPage}&per_page=10&search=${search}`, headers)
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

        setTotalPages(Math.ceil(resBooks.data.total / 10))
        setBooks(resBooks.data.books)
    }

    const changePage = (pageNum) => {
        setCurrPage(pageNum)
    }

    useEffect(() => {
        fetchData()
    }, [currPage])

    return (
        <div className="min-h-screen flex flex-col items-center">
            <Navbar/>
            <div className="w-1/2 mt-10 bg-gray-100 shadow-lg px-4 md:px-10 py-4 md:py-10 rounded-lg">
                <p className="text-2xl mb-4">Catalogue</p>
                <div className="mb-4">
                    <SearchBar changePage={changePage} currPage={currPage} setSearch={setSearch} fetchData={fetchData}/>
                </div>

                <Catalogue currPage={currPage} books={books} search={search} fetchData={fetchData}/>

                <div className="flex justify-center mt-4">
                    <Pagination totalPages={totalPages} currPage={currPage} changePage={changePage} />
                </div>
            </div>
        </div>
    );
}

export default HomePage
