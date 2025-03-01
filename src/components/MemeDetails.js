import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaTimes, FaShareSquare } from 'react-icons/fa';

const MemeDetails = ({ meme, isOpen, onClose, darkMode }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setComment('');
            setLiked(false);
            setLikesCount(meme.likes || 0);

            const defaultComments = [
                { id: 1, username: 'user123', text: 'This is hilarious! 😂', timestamp: '2 hours ago' },
                { id: 2, username: 'meme_lover', text: 'Perfect use of this template!', timestamp: '1 day ago' },
            ];

            if (meme.comments > 2) {
                const additionalCommentsNeeded = meme.comments - 2;
                const additionalComments = Array.from({ length: additionalCommentsNeeded }, (_, i) => ({
                    id: i + 3,
                    username: `user${Math.floor(Math.random() * 1000)}`,
                    text: `Comment #${i + 3} on this meme!`,
                    timestamp: `${Math.floor(Math.random() * 24)} hours ago`
                }));
                setComments([...defaultComments, ...additionalComments]);
            } else {
                setComments(defaultComments.slice(0, meme.comments || 2));
            }
        }
    }, [isOpen, meme]);

    const handleLike = () => {
        setLiked(!liked);
        setLikesCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            const newComment = {
                id: Date.now(),
                username: 'current_user',
                text: comment,
                timestamp: 'Just now'
            };
            setComments([newComment, ...comments]);
            setComment('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 animate-fadeIn">
            <div
                className={`relative w-full max-w-2xl max-h-dvh mx-4 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                    } animate-scaleIn`}
            >
                <div className="relative">
                    <h2 className={`text-xl text-center font-bold px-4 py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {meme.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="absolute top-0 right-3 z-10 p-2 rounded-full bg-black bg-opacity-60 text-white hover:bg-opacity-80 transition-all"
                    >
                        <FaTimes />
                    </button>
                </div>
                <div className="w-full h-96 overflow-hidden">
                    <img
                        src={meme.url}
                        alt={meme.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className={`flex justify-between items-center px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleLike}
                            className="flex items-center space-x-1 transition-colors"
                        >
                            {liked ?
                                <FaHeart className="text-red-500" /> :
                                <FaRegHeart className={darkMode ? "text-white" : "text-gray-800"} />
                            }
                            <span>{likesCount}</span>
                        </button>
                        <div className="flex items-center space-x-1">
                            <FaComment className={darkMode ? "text-white" : "text-gray-800"} />
                            <span>{comments.length}</span>
                        </div>
                    </div>
                    <span className="w-auto"><FaShareSquare /></span>
                </div>

                <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                    <form onSubmit={handleSubmitComment} className="mb-4">
                        <div className="flex">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment..."
                                className={`flex-grow p-2 rounded-l border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                    }`}
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition-colors"
                            >
                                Post
                            </button>
                        </div>
                    </form>

                    <div className="max-h-60 overflow-y-auto">
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <div
                                    key={comment.id}
                                    className={`p-3 mb-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold">{comment.username}</span>
                                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                    </div>
                                    <p>{comment.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemeDetails;