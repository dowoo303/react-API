import { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitChat = async (e) => {
    try {
      // Enter키로도 검색 가능하도록 새로고침 방지
      e.preventDefault();

      if (isLoading) {
        alert("검색중입니다 ...");
        return;
      }

      if (!question) {
        alert("질문을 입력해주세요.");

        return;
      }

      // 로딩중 true
      setIsLoading(true);
      setContent("");

      const response = await axios.post(
        "https://holy-fire-2749.fly.dev/chat",
        {
          //question: question,
          question, // 키, value 값, 이름이 모두 같으면 생략 가능
        },
        {
          headers: {
            Authorization: "Bearer BLOCKCHAINSCHOOL3",
          },
        }
      );

      if (response.status !== 200) {
        alert("오류가 발생했습니다.");
        setIsLoading(false);
        return;
      }

      console.log(response);
      setContent(response.data.choices[0].message.content);

      // 로딩중 false
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      // 로딩중 false
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center text-white">
      <form onSubmit={onSubmitChat}>
        <input
          className="text-black"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)} // value 때문에 막힌 input안 값 변경 가능하게 만듦
        />
        <input type="submit" value="검 색" />
      </form>
      {content && <div className="mt-4 px-16">{content}</div>}
    </div>
  );
};

export default Chat;
