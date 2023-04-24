import {format, parse, isBefore} from "date-fns"
const dateFormat = "dd/MM/yyyy"
const parseFormat = "yyyy-MM-dd"
export const formatDate = (date) => {
    const parsedDate = parse(date, parseFormat, new Date())
    const formattedDate = format(parsedDate, dateFormat)
    return formattedDate
}

export const isDue = (date) => {
    const parsedDate = parse(date, parseFormat, new Date())
    const result = isBefore(parsedDate, new Date())
    return result
}