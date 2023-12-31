export default function CommentComponent({
    userId,
    setBody,
    setCommentId,
    editingCommentId,
    handleEditCommentId,
    comments,
}) {
    function timeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds}秒前`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)}分前`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)}時間前`;
        } else {
            return `${Math.floor(diffInSeconds / 86400)}日前`;
        }
    }

    const onClickCommentEditButton = (comment, id) => {
        return () => {
            setBody(comment);
            setCommentId(id);
            handleEditCommentId(id);
        };
    };

    return (
        <>
            <ul className="my-20 mb-64">
                {comments &&
                    comments.map((elem) => (
                        <>
                            <li
                                key={elem.id}
                                className="border p-4 rounded-md shadow-md hover:bg-gray-100 transition-colors duration-300"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                        <span className="text-gray-400 text-sm mr-2">
                                            #{elem.id}
                                        </span>
                                        <p className="text-xl font-semibold">
                                            {elem.user.name}
                                        </p>
                                        {elem.user_id == userId && (
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2  mx-3 border border-blue-700 rounded"
                                                onClick={onClickCommentEditButton(
                                                    elem.body,
                                                    elem.id
                                                )}
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 4a2 2 0 012-2h.75a.5.5 0 01.5.5V4h12V2.5a.5.5 0 01.5-.5H19a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4z"
                                            />
                                        </svg>
                                        {timeAgo(new Date(elem.created_at))}
                                    </div>
                                </div>
                                <p className="text-gray-700">{elem.body}</p>
                            </li>
                        </>
                    ))}
            </ul>
        </>
    );
}
