import React, { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../../components/mypage/Skeleton";

import { Button, Font } from "../../elements/index";
import OnBoarding from "../../components/category/Onboarding";
import OnboadingSkeleton from "../../components/category/OnboadingSkeleton";
import Header from "../../components/category/Header";
import PlayBox from "../../components/category/PlayBox";
import FloatingBtn from "../../elements/FloatingBtn";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { actionCreators as postActions } from "../../redux/modules/post";

import { RiArrowRightSLine } from "react-icons/ri";

const Main = (props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [all_list, setAllList] = React.useState([]);
  const is_loading = useSelector((state) => state.post.is_loading);
  const track_list = useSelector((state) => state.post.post_list);
  const global_player_mode = useSelector((state) => state.globalPlayer.mode);
  const now_track = useSelector((state) => state.globalPlayer.now_track);
  const HAS_VISITED_BEFORE = sessionStorage.getItem("hasVisitedBefore");

  useEffect(() => {
    if (!now_track?.musicSrc) {
      return;
    }

    changeBoxListData();
  }, [now_track]);

  useEffect(() => {
    if (global_player_mode === "stop") {
      changeBoxListData();
    }
  }, [global_player_mode]);

  useEffect(() => {
    if (track_list) {
      changeBoxListData();
    }
  }, [track_list]);

  useEffect(() => {
    dispatch(postActions.loadPostDB());
  }, []);

  useEffect(() => {
    if (HAS_VISITED_BEFORE) {
      return;
    }
    setShowModal(true);
  }, [HAS_VISITED_BEFORE]);

  const handleClose = () => {
    setShowModal(false);
    sessionStorage.setItem("hasVisitedBefore", "true");
  };

  const changeBoxListData = () => {
    let idx = 0;
    const _list = track_list?.map((list) => {
      let obj = {};
      const new_list = list.tracks.map((l) => {
        if (global_player_mode === "stop") {
          obj = {
            uniq: `track-id-${idx}`,
            CommentCnt: l.CommentCnt,
            Comments: l.Comments,
            Likes: l.Likes,
            TrackTags: l.TrackTags,
            TrackThumbnail: l.TrackThumbnail,
            User: l.User,
            category: l.category,
            createdAt: l.createdAt,
            title: l.title,
            trackId: l.trackId,
            trackUrl: l.trackUrl,
            userId: l.userId,
            active: false,
          };
        } else {
          if (idx === Number(now_track?.uniqIdx)) {
            //?????? ???????????? ?????? ????????? ?????? active true
            obj = {
              uniq: `track-id-${idx}`,
              CommentCnt: l.CommentCnt,
              Comments: l.Comments,
              Likes: l.Likes,
              TrackTags: l.TrackTags,
              TrackThumbnail: l.TrackThumbnail,
              User: l.User,
              category: l.category,
              createdAt: l.createdAt,
              title: l.title,
              trackId: l.trackId,
              trackUrl: l.trackUrl,
              userId: l.userId,
              active: true,
            };
          } else {
            obj = {
              uniq: `track-id-${idx}`,
              CommentCnt: l.CommentCnt,
              Comments: l.Comments,
              Likes: l.Likes,
              TrackTags: l.TrackTags,
              TrackThumbnail: l.TrackThumbnail,
              User: l.User,
              category: l.category,
              createdAt: l.createdAt,
              title: l.title,
              trackId: l.trackId,
              trackUrl: l.trackUrl,
              userId: l.userId,
              active: false,
            };
          }
        }

        // uniq ????????? ??????
        idx++;

        return obj;
      });

      return {
        category: list.category,
        tracks: new_list,
      };
    });
    setAllList(_list);
  };

  return (
    <>
      <Header topMenu props={props} />

      {is_loading === false
        ? showModal && <OnboadingSkeleton onClose={handleClose} />
        : showModal && <OnBoarding onClose={handleClose} />}

      <WrapDiv>
        <Wrap>
          <Button
            bg
            _onClick={() => {
              props.history.push("/edit/base");
            }}
          >
            ?????? ????????? ?????????
          </Button>
          <DivText>?????? ???????????? ????????? ??????????????? ???????????????!</DivText>
        </Wrap>
        {is_loading === false ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {new Array(10).fill(1).map((_, i) => {
              return <Skeleton key={i} />;
            })}
          </div>
        ) : (
          all_list &&
          all_list.map((list, idx) => {
            return (
              <React.Fragment key={idx}>
                <TrackWrap>
                  <Wrap>
                    <DivBoldText>
                      <Font title fontSize="18px" margin="18px 0px">
                        {list.category.categoryText}
                      </Font>
                      <IconDiv
                        onClick={() => {
                          props.history.push(
                            `/category/${list.category.category}`
                          );
                        }}
                      >
                        <RiArrowRightSLine size="28" cursor="pointer" />
                      </IconDiv>
                    </DivBoldText>
                  </Wrap>

                  <Flex>
                    {list.tracks.map((l) => {
                      return (
                        <div key={`track-id-${l.uniq}`}>
                          <PlayBox
                            {...l}
                            setAllListData={setAllList}
                            all_list={all_list}
                            target_uniq={l.uniq}
                          />
                        </div>
                      );
                    })}
                  </Flex>
                </TrackWrap>
              </React.Fragment>
            );
          })
        )}
      </WrapDiv>
      <FloatingBtn bubble />
    </>
  );
};

const WrapDiv = styled.div`
  max-width: 425px;
  width: 100%;
  margin: 20px auto 0px auto;
`;

const TrackWrap = styled.div`
  margin-bottom: 30px;
`;

const Wrap = styled.div`
  padding: 0px 20px;
`;

const DivText = styled.div`
  font-size: 12px;
  padding: 15px 0px 10px 0px;
  text-align: center;
`;

const DivBoldText = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconDiv = styled.div`
  width: 28px;
  height: 28px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  padding: 0px 20px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    //???????????? ??????
    height: 4px;
    border-radius: 6px;
    overflow: auto;
  }
  &::-webkit-scrollbar-thumb {
    //????????? ??????
    background: var(--point-color);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #000; /*???????????? ?????? ??????*/
  }
`;

export default Main;
