import { apiSlice } from "./apiSlices";
import { BOOKS_URL, BOOKS_DETAILS_URL, ADD_BOOKS_URL, UPDATE_URL, DELETE_URL } from "../constants";
export const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => ({
                url: BOOKS_URL,
            }),
            keepUnusedDataFor: 5
        }),
        getBookDetails: builder.query({
            query: (bookId) => ({
                url: `${BOOKS_DETAILS_URL}/${bookId}`
            }),
            keepUnusedDataFor: 5,
        }),
        addBook: builder.mutation({
            query: (data) => ({
                url: ADD_BOOKS_URL,
                method: 'POST',
                body: data
            }),
        }),
        editBook: builder.mutation({
            query: (data) => ({
                url: `${UPDATE_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
        }),
        deleteBook: builder.mutation({
            query: (bookId) => ({
                url: `${DELETE_URL}/${bookId}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const { useGetBooksQuery, useGetBookDetailsQuery, useAddBookMutation, useEditBookMutation, useDeleteBookMutation } = bookApiSlice; 