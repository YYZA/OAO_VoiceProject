import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ChatRecorder from "../chat/ChatRecorder";
import SendOptions from "./SendOptions";
import { Container, Font } from "../../elements";
import { IoIosSend } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";

const RoomFooter = ({ sendMessage, show_option_modal, setOptionModal }) => {
  const chat = useSelector((state) => state.chat.instance);
  const [content, setCotentText] = React.useState("");
  const [show_record_modal, setRecordModal] = useState(false);
  const [show_reqeust_modal, setRequestModal] = useState(false);

  const [voice_file, setVoiceFile] = useState({
    file: null,
    type: null,
    url: null,
  });

  console.log("녹음된 파일: ", voice_file);

  useEffect(() => {}, [content]);

  const onChange = (e) => {
    setCotentText(e.target.value);
  };

  const handleSendMessage = () => {
    if (!content.trim().length) {
      return;
    }

    sendMessage(content);
    setCotentText("");
  };

  const handleWithKeyboardSend = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleCloseRecordModal = () => {
    setRecordModal(false);
  };

  const handleCloseRequestModal = () => {
    setRequestModal(false);
    sendMessage("샘플 보내기");
  };

  return (
    <>
      <ChatFooter>
        <Container padding={"0"}>
          <List>
            <div
              onClick={() => {
                setOptionModal(!show_option_modal);
              }}
            >
              {show_option_modal ? (
                <IoIosClose
                  style={{
                    marginRight: "10px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <AiOutlinePlus
                  style={{
                    marginRight: "10px",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
            <div style={{ width: "95%" }}>
              <CommentInput
                className="commentInput"
                type="text"
                placeholder="메시지를 입력해주세요."
                onChange={onChange}
                value={content}
                onKeyUp={handleWithKeyboardSend}
              />
            </div>
            <div>
              <IoIosSend
                className={`send-btn ${!content.length ? "disabled" : ""}`}
                onClick={handleSendMessage}
                disabled={!content.length}
              />
            </div>
          </List>
          {show_option_modal && (
            <SendOptions
              sendMessage={sendMessage}
              setRecordModal={setRecordModal}
              setRequestModal={setRequestModal}
            />
          )}
        </Container>
      </ChatFooter>

      {show_reqeust_modal && (
        <RequestModal>
          <Container padding={"0"} _className={"record-container"}>
            <div className={"request-header"}>
              <IoIosClose
                className={"close-btn"}
                onClick={handleCloseRequestModal}
              />

              <button className={"send-btn"} onClick={handleCloseRequestModal}>
                <Font title>완료</Font>
              </button>
            </div>
            <div className={"request-body"}>
              <Font _className={"request-title"} title>
                샘플 요청 사항
              </Font>
              <p className={"request-sub-title"}>
                원하는 목소리에 대한 요구사항을 최대한 상세히 작성해주세요 :)
              </p>

              <textarea
                className={"reqeust-ta"}
                placeholder={"요구사항을 작성해주세요."}
              ></textarea>
            </div>
          </Container>
        </RequestModal>
      )}

      {show_record_modal && (
        <RecordModal>
          <Container padding={"0"} _className={"record-container"}>
            <div className={"record-header"}>
              <IoIosClose
                className={"close-btn"}
                onClick={handleCloseRecordModal}
              />
            </div>
            <div className={"record-request"}>
              <Font _className={"request-title"} title>
                샘플 요청 사항
              </Font>

              <p className={"request-content"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquid architecto commodi cumque eaque eveniet, itaque quasi
                ullam! Alias dolor itaque molestiae numquam quas. A, aut
                delectus esse incidunt ipsa quia. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Aliquid architecto commodi cumque
                eaque eveniet, itaque quasi ullam! Alias dolor itaque molestiae
                numquam quas. A, aut delectus esse incidunt ipsa quia. Lorem
                ipsum dolor sit amet,
              </p>
            </div>
            <div className={"record-widget"}>
              <ChatRecorder setVoiceFile={setVoiceFile} />
            </div>
          </Container>
        </RecordModal>
      )}
    </>
  );
};

const ChatFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  .send-btn {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 10px;
    color: var(--point-color);

    &.disabled {
      pointer-events: none;
      color: #f0f8ff;
    }
  }
`;

const List = styled.div`
  display: flex;
  width: 100%;
  background: #2c2b2b;
  height: 70px;
  padding: 0 20px;
  max-width: 425px;
  align-items: center;
  margin: 10px auto 0;
`;

const CommentInput = styled.input`
  padding: 0 0 0 5px;
  height: 35px;
  background: none;
  width: 100%;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1px;
  color: white;
  margin-right: 5px;

  &:focus {
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1px;
    border-color: #f1134e;
  }
`;

const RecordModal = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;

  .record-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }

  .record-header {
    height: 60px;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    flex-basis: 60px;

    .close-btn {
      cursor: pointer;
      font-size: 36px;
    }
  }

  .record-request {
    flex: 1;

    .request-title {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    .request-content {
      // header: 60px, title: 40px, recorder: 216px = 316px
      padding: 0 16px 16px 16px;
      max-height: calc(100vh - 316px);
      overflow-y: auto;
    }
  }

  .record-widget {
    flex-shrink: 0;
    background-color: #2c2b2b;
  }
`;

const RequestModal = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;

  .request-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }

  .request-header {
    height: 60px;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    flex-basis: 60px;
    padding-left: 12px;

    .close-btn {
      cursor: pointer;
      font-size: 36px;
    }

    .send-btn {
      cursor: pointer;
      border: 0;
      background: none;
      color: var(--point-color);
      font-size: 18px;
    }
  }

  .request-body {
    .request-title {
      height: 30px;
      font-size: 16px;
      margin-bottom: 10px;
      padding: 0 20px;
    }

    .request-sub-title {
      color: #afafaf;
      height: 20px;
      font-size: 13px;
      margin-bottom: 20px;
      padding: 0 20px;
    }

    .reqeust-ta {
      border: 0;
      color: #fff;
      width: 100%;
      font-size: 14px;
      background: none;
      height: calc(100vh - 140px);
      padding: 0 20px 20px 20px;
    }
  }
`;

export default RoomFooter;
