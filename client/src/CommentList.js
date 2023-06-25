import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CommentList = ({postId}) => {
    
    const [comments, setComments] = useState([]);

    const fetchDate = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    };

    
    useEffect(() => {
        fetchDate();
    }, []);


    const renderComments = comments.map((comment) => {
        return <li key={comment.commentId}>{comment.content}</li>
    });

    return <ul>{renderComments}</ul>;
};

export default CommentList;