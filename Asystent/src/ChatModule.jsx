import React, { useState } from 'react';
import ChatBox from 'react-chat-plugin';

export default function ChatModule () {
    const [messages, setMessages] = useState([
          {
            text: 'Połączyłeś się z Asystentem Żywieniowym',
            timestamp: 1578366389250,
            type: 'notification',
          },
          {
            author: { username: 'Asystent Żywieniowy', id: 2, avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg' },
            text: 'Witaj, podaj listę składników',
            type: 'text',
            timestamp: 1578366425250,
          },
        ]);

      const handleOnSendMessage = (message) => {
        setMessages(
          messages.concat({
            author: {
              username: 'Użytkownik',
              id: 1,
            },
            text: message,
            timestamp: +new Date(),
            type: 'text',
          },
          {
            author: {
              username: 'Asystent Żywieniowy',
              id: 2,
              avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
            },
            text: "[Odpowiedź asystenta] (jeszcze nie zaimplementowano połączenia z serwerem)",
            timestamp: +new Date(),
            type: 'text',
        }),
        );
      };
    return (
<ChatBox
  messages={messages}
  userId={1}
  onSendMessage={handleOnSendMessage}
  width={'500px'}
  height={'500px'}
/>
    );
}