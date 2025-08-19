import React from 'react';
import Link from "next/link";

interface PaginationProps {
    page: number;
    totalPages: number;
    baseUrl: string;
}

function Pagination({page, totalPages, baseUrl}: PaginationProps) {
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);
    return (
        <nav className="flex justify-center py-10">
            {page > 1 && (
                <Link href={`${baseUrl}?page=${page > 1 ? page - 1 : 1}`}
                      className=" px-4 py-2 mx-1 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-200"
                >
                    &laquo;
                </Link>
            )}
            {
                pages.map(currenPage => (
                        <Link href={`${baseUrl}?page=${currenPage}`}
                              key={currenPage}
                              className={`px-4 py-2 mx-1 text-sm font-medium rounded-md ${currenPage === page ? 'bg-indigo-600 text-white font-black' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        >
                            {currenPage}
                        </Link>
                    )
                )
            }
            {
                page < totalPages && (
                    <Link
                        href={`${baseUrl}?page=${page < totalPages ? page + 1 : totalPages}`}
                        className="px-4 py-2 mx-1 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-200"
                    >
                        &raquo;
                    </Link>
                )
            }

        </nav>
    )
        ;
}

export default Pagination;