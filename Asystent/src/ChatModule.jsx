import React, { useState, useEffect } from 'react';
import ChatBox from 'react-chat-plugin';
import axios from 'axios';
import './styles.css';

export default function ChatModule () {
    const [user, setUser] = useState({token: undefined, user_id: undefined})
    const [messages, setMessages] = useState([
          {
            text: 'Połączyłeś się z Asystentem Żywieniowym',
            timestamp: 1578366389250,
            type: 'notification',
          }
        ]);

    const handleRequestCard = (res) => {
      setMessages( m =>
        m.concat({   
          author: { username: 'Digital Assistant', id: 2, avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg' },
          text:  createCardContent(res.data[0].body),
          type: 'text',
          timestamp: +new Date(),
        })
      )
    }

    const createCardContent = (data) => {
      return (
        <div>
          <div className="card-title">{data.title_id}</div>
          <div className="card-desc">{data.description}</div>
          <div className="card-link">Recipe: <a href={data.link}>{data.link}</a></div>
          <img src={data.img} alt={data.title_id}></img>
        </div>
      )
    }

    const handleRequestMessage = (res) => {
      setMessages( m =>
        m.concat({   
          author: { username: 'Digital Assistant', id: 2, avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg' },
          text: res.data[0].body.message,
          type: 'text',
          timestamp: +new Date(),
        })
      )
    }
      useEffect(() => {
        let config = {
          header:  'Content-Type: application/json'
        }
        let data = {}
        axios.post(`http://164.90.161.190:8080/auth`, data, config).then(res => {
          setUser(res.data);
        });
      }, []);

      useEffect(() => {
        if (user.token) {
          let config = {
            headers: {
              'Authorization': 'Bearer ' + user.token,
              'Content-Type': 'application/json'
            }
          }
          let data = {
            "type": "message",
            "body": {
                "message": "init request"
            }
        }
          axios.post(`http://164.90.161.190:8080/add_event`, data, config)
          .then(res => {
            setMessages( m =>
              m.concat({   
                author: { username: 'Digital Assistant', id: 2, avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg' },
                text: res.data[0].body.message,
                type: 'text',
                timestamp: +new Date(),
              })
            )
          })
        }
        
      }, [user])

      const handleOnSendMessage = (message) => {
        setMessages( m =>
          m.concat({
            author: {
              username: 'User',
              id: 1,
            },
            text: message,
            timestamp: +new Date(),
            type: 'text',
          })
        );
        if (user.token) {
          let config = {
            headers: {
              'Authorization': 'Bearer ' + user.token,
              'Content-Type': 'application/json'
            }
          }
          let data = {
            "type": "message",
            "body": {
                "message": message
            }
        }
          axios.post(`http://164.90.161.190:8080/add_event`, data, config)
          .then(res => {
            if (res.data[0].type === 'message') {
              handleRequestMessage(res);
            } else if (res.data[0].type === 'card') {
              handleRequestCard(res);
            }
          })
        }
      };
    return (
      <div className="main-container">
        <div className="chatbox-container">
          <ChatBox
            messages={messages}
            userId={1}
            onSendMessage={handleOnSendMessage}
            width={'800px'}
            height={'89vh'}
          />
        </div>

      </div>
    );
}