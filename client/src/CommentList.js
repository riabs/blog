import React from 'react';

const CommentList = ({comments}) => {
    

    const renderComments = comments.map((comment) => {
        return <li key={comment.id}>{comment.status === 'approved' ? comment.content : comment.status}</li>
    });

    return <ul>{renderComments}</ul>;
};

export default CommentList;