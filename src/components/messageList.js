import React from 'react';
import Message from './message.js'

function  MessageList({messages, toggleStarred, toggleSelected}) {
    console.log(messages)
    return (
        <div>
            {messages.map(message => <Message key={message.id} id={message.id} checked={message.checked} subject={message.subject} read={message.read} starred={message.starred} labels={message.labels} toggleStarred={toggleStarred} toggleSelected={toggleSelected} />
            )}
        </div>
    )
}

export default MessageList;