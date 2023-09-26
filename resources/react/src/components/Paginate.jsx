import { Link } from "react-router-dom";

export default function Paginate({
    currentPage,
    lastPage,
    queryType,
    queryValue,
}) {
    let startPage = 1;
    let endPage = 1;
    let numberOfPages = 0;

    if (currentPage !== undefined && lastPage !== undefined) {
        startPage = Math.max(currentPage - 2, 1);
        endPage = Math.min(currentPage + 2, lastPage);
        numberOfPages = Math.max(0, endPage - startPage + 1);
    }

    const generateLinkTo = (page) => {
        switch (queryType) {
            case "q":
                return `?q=${queryValue}&page=${page}`;
            case "cat":
                return `?cat=${queryValue}&page=${page}`;
            case "all":
                return `?all&page=${page}`;
            default:
                return "";
        }
    };

    return (
        <div className="flex justify-center space-x-2">
            {currentPage !== 1 && (
                <>
                    <Link
                        to={generateLinkTo(1)}
                        className="bg-white hover:bg-blue-100 px-4 py-2 border rounded "
                    >
                        最初
                    </Link>
                    <Link
                        to={generateLinkTo(currentPage - 1)}
                        className="bg-white hover:bg-blue-100 px-4 py-2 border rounded"
                    >
                        前
                    </Link>
                </>
            )}

            {[...Array(numberOfPages)].map((_, idx) => {
                const pageNumber = startPage + idx;
                return (
                    <Link
                        key={pageNumber}
                        to={generateLinkTo(pageNumber)}
                        className={`
                        px-4 py-2 border rounded 
                        ${
                            currentPage === pageNumber
                                ? "bg-blue-500 text-white cursor-default pointer-events-none"
                                : "bg-white hover:bg-blue-100"
                        }
                    `}
                    >
                        {pageNumber}
                    </Link>
                );
            })}

            {currentPage !== lastPage && (
                <>
                    <Link
                        to={generateLinkTo(currentPage + 1)}
                        className="bg-white hover:bg-blue-100 px-4 py-2 border rounded "
                    >
                        次
                    </Link>
                    <Link
                        to={generateLinkTo(lastPage)}
                        className="bg-white hover:bg-blue-100 px-4 py-2 border rounded "
                    >
                        最後
                    </Link>
                </>
            )}
        </div>
    );
}
