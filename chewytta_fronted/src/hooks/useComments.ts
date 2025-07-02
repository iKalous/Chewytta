import { useState } from 'react';

interface Comment {
    id: number;
    user: string;
    content: string;
    date: string;
}

export const useComments = (initialComments: Comment[]) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState('');

    const addComment = () => {
        if (!newComment.trim()) return;

        const comment = {
            id: comments.length + 1,
            user: '游客',
            content: newComment,
            date: new Date().toLocaleDateString(),
        };

        setComments([comment, ...comments]);
        setNewComment('');
    };

    return {
        comments,
        newComment,
        setNewComment,
        addComment,
    };
};
