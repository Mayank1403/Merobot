import { useState } from "react"
import MessageList from "./MessageList";
//Images
import First from "./images/first.png";
import Second from "./images/second.png";
import Third from "./images/third.png";


const Message = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([{user: "MeroBot", text: "These are the 3 images", img: [{url: First, id: 1}, {url: Second, id: 2}, {url: Third, id: 3}]}]);

    const submitMessage = (event) => {
        event.preventDefault();
        setMessages([...messages, {user: "User", text: input, img: []}]);
        setInput('');
    }

    return (
        <div className="message">
            <form className="message__form">
                <input
                    className = "message__input"
                    placeholder = "Enter a message"
                    value = {input}
                    onChange = {event => setInput(event.target.value)}
                />
                <button
                    className = "message__button"
                    type = "submit"
                    disabled = {!input}
                    onClick = {submitMessage}
                >
                    Send
                </button>
            </form>

            {messages.map((message, index)=>(
                <MessageList text={message} key={index}/>
            ))}
        </div>
    );
}
 
export default Message;