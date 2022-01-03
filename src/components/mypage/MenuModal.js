import React from "react";
import styled from "styled-components";
import Container from "../../elements/Container";
import { IoIosClose } from "react-icons/io";
import { BsFillHeartFill } from "react-icons/bs";
import { ImShare } from "react-icons/im";
import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";
import DetailTag from "./DetailTag";
import { history } from "../../redux/configStore";
import { useSelector } from "react-redux";
import { MdOutlineMoreVert } from "react-icons/md";
import SingleAudioPlayer from "../../shared/SingleAudioPlayer";
import { apis } from "../../shared/api";
import { RiChat4Fill } from "react-icons/ri";
import DeleteModal from "./DeleteModal";
import { newGetCookie } from "../../shared/Cookie";

const MenuModal = (props) => {
  const { open, close } = props;
  const state = useSelector((state) => state.comment.comments);
  const [LikeBtn, setLikeBtn] = React.useState(false);
  const userId = props.props.userId;
  const trackId = props.props.trackId;
  const nick = newGetCookie("nick");
  const isMe = props.props.User.nickname === nick;

  const likeBtn = (trackId) => {
    apis.likeTrack(trackId).then((res) => {
      console.log(res);
    });
  };
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        <DeleteModal
          props={props}
          open={modalOpen}
          close={closeModal}
          header={"123"}
        />
        {open ? (
          <Section>
            <Container>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                {isMe && (
                  <MdOutlineMoreVert
                    size="20px"
                    style={{ margin: "13px 10px 0 0px", cursor: "pointer" }}
                    onClick={() => {
                      openModal();
                    }}
                  />
                )}

                <ImShare
                  onClick={() => {
                    history.push(`/share/${trackId}`);
                  }}
                  style={{ margin: "10px 0px 0 0px", cursor: "pointer" }}
                  size="20px"
                />
                <IoIosClose
                  style={{ margin: "13px 0px 0 0px", cursor: "pointer" }}
                  size="40px"
                  color="white"
                  onClick={close}
                />
              </div>
              <Profile
                onClick={() => {
                  history.push({
                    pathname: `/portfolio/${userId}`,
                  });
                  close();
                }}
              >
                <ProfileCircle src={props.user_image} />
                <Name>{props.props.User.nickname}</Name>
              </Profile>
              <div style={{ textAlign: "center" }}>
                <ImageCircle
                  src={props.props.TrackThumbnail?.trackThumbnailUrlFull}
                />
              </div>

              <Title>{props.props.title}</Title>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {props.props.TrackTags.map((p, idx) => {
                  return <DetailTag bg="black" key={idx} {...p}></DetailTag>;
                })}
              </div>
              <SingleAudioPlayer
                // autoPlay
                audio={props.props.trackUrl}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginRight: "15px",
                    lineHeight: "50%",
                  }}
                >
                  {LikeBtn ? (
                    <BsFillHeartFill
                      onClick={() => {
                        likeBtn(trackId);
                        setLikeBtn(false);
                      }}
                      style={{
                        fontSize: "22px",
                        color: "red",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <BsFillHeartFill
                      onClick={() => {
                        likeBtn(trackId);
                        setLikeBtn(true);
                      }}
                      style={{
                        fontSize: "22px",
                        color: "white",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    />
                  )}

                  <Text>{props.props.Likes.likeCnt}</Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "2px",
                    lineHeight: "80%",
                  }}
                >
                  <RiChat4Fill
                    color="white"
                    style={{
                      fontSize: "22px",
                      color: "#545454",
                      marginRight: "5px",
                    }}
                  />
                  <Text>{props.props.Comments.length}</Text>
                </div>
              </div>
              <div
                style={{
                  margin: "10px 0px",
                  height: "410px",
                  overflowY: "scroll",
                }}
              >
                {state[0] === undefined
                  ? props.props.Comments.map((p, idx) => {
                      return <CommentList {...props} key={idx} {...p} />;
                    })
                  : state[0]?.map((p, idx) => {
                      return <CommentList {...props} key={idx} {...p} />;
                    })}
              </div>
              <CommentWrite {...props} />
            </Container>
          </Section>
        ) : null}
      </div>
    </>
  );
};

MenuModal.defaultProps = {
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXaZTRs1NC8dvfYkOxERlkyi-nEMnP15bag&usqp=CAU",
};

const Profile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid black;
  background: url("${(props) => props.src}");
  background-size: 100%;
  background-position: center;
  background-repeat: cover;
`;

const ImageCircle = styled.img`
  width: 190px;
  height: 190px;
  border-radius: 50%;
  margin: 30px 0px 0px 0px;
  background: url("${(props) => props.src}");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 380px) {
    width: 80px;
    height: 80px;
  }
`;

const Section = styled.div`
  position: absolute;
  z-index: 9900;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  height: 130%;
  background-color: rgba(10, 10, 10, 0.86);
  backdrop-filter: blur(4px);
`;

const Name = styled.p`
  font-size: 18px;
  color: white;
`;
const Title = styled.h1`
  margin-top: 10px;
  font-size: 18px;
  color: white;
  text-align: center;
`;

const Text = styled.p`
  margin-top: 5px;
  font-size: 17px;
  color: white;
`;
export default MenuModal;
