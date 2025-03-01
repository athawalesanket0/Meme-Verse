import { useState, useEffect } from 'react';
import { FaComment, FaHeart } from 'react-icons/fa';

const MemeCard = ({ url, name, id, darkMode, onOpenDetails, likesCount = 0, commentsCount = 0 }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [cardRef, setCardRef] = useState(null);

    useEffect(() => {
        if (!cardRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' }
        );

        observer.observe(cardRef);

        return () => {
            if (cardRef) observer.disconnect();
        };
    }, [cardRef]);

    return (
        <div ref={setCardRef}
            className={`w-full mb-4 break-inside-avoid transition-transform duration-300`}>
            <div className={`w-full overflow-hidden rounded-lg ${darkMode ? 'shadow-[0_4px_12px_rgba(255,255,255,0.1)]' : 'shadow-lg'}`}>
                <div className="relative overflow-hidden rounded-t-lg">
                    {(!isLoaded || !isVisible) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                            <div className="animate-pulse w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        </div>
                    )}
                    {isVisible && (
                        <img
                            className={`w-full block aspect-square object-cover transition-all duration-300 cursor-pointer ${isLoaded ? 'opacity-100' : 'opacity-0'
                                } ${isHovered ? 'scale-[1.05]' : 'scale-100'}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            src={url}
                            alt={id}
                            title={name}
                            onLoad={() => setIsLoaded(true)}
                            onClick={onOpenDetails}
                        />
                    )}
                </div>
                <div className={`py-2 px-4 transition-colors duration-300 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    <div className="flex justify-between items-center space-x-3">
                        <div className="flex items-center space-x-1">
                            <FaHeart className="text-red-500" />
                            <span className="text-sm">{likesCount}</span>
                        </div>
                        <button
                            onClick={onOpenDetails}
                            className="flex items-center space-x-1 cursor-pointer"
                        >
                            <FaComment className={darkMode ? "text-gray-200" : "text-gray-800"} />
                            <span className="text-sm">{commentsCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemeCard;