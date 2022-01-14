import React from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState, useRef } from "react";
import Track from "../../components/mypage/Track";
import { useLocation } from "react-router-dom";
import { apis } from "../../shared/api";
import Header from "../../components/category/Header";
import { Container } from "../../elements/index";
import { actionCreators as searchActions } from "../../redux/modules/search";
import { useDispatch, useSelector } from "react-redux";

import { RiArrowLeftSLine } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";

const KeywordSearch = (props) => {
  const dispatch = useDispatch();
  const trackWrapRef = useRef(null);
  const location = useLocation();
  const keyword = location.state.value;
  const search_list = useSelector((state) => state.search.list);
  const search_page = useSelector((state) => state.search.page);
  console.log("search_list", search_list);
  console.log("search_page", search_page);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(search_page);

  useEffect(() => {
    dispatch(searchActions.getSearchDB(keyword, page));
  }, [page]);

  const fetchData = () => {
    let pages = page + 1;
    const track = 12;
    apis.search(keyword, page, track).then((res) => {
      if (res.data.tracks.length === 0 || res.data.tracks.length < 12) {
        setHasMore(false);
      }
      setPage(pages);
      handleSearch();
    });
  };

  const inputRef = React.useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    if (value.length < 2) {
      window.alert("검색어를 두 글자 이상 입력해주세요OAO!");
    }
    if (value.length > 1 && keyword !== value) {
      dispatch(searchActions.resetdata(page));
      dispatch(searchActions.getSearchDB(value, page));
    }
  };

  useEffect(() => {
    handleSearch();
  }, [page]);

  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      {search_list && search_list.length > 0 ? (
        <>
          <Header topMenu />
          <Container>
            <Flex>
              <Flex
                onClick={() => {
                  props.history.push("/searchKeyword");
                  dispatch(searchActions.resetdata(page));
                }}
              >
                <RiArrowLeftSLine size="30" cursor="pointer"></RiArrowLeftSLine>
              </Flex>

              <Multiline
                ref={inputRef}
                onKeyPress={onKeyPress}
                placeholder="검색어를 두글자 이상 입력해주세요."
                type="text"
                defaultValue={keyword}
              ></Multiline>
              <HiOutlineSearch
                size="30"
                cursor="pointer"
                onClick={onClick}
              ></HiOutlineSearch>
            </Flex>
          </Container>
          <InfiniteScroll
            dataLength={search_list.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Grid>
              <TrackGrid ref={trackWrapRef}>
                {search_list.map((l) => {
                  return (
                    <TrackDiv key={l.trackId}>
                      <Track {...l} trackWrapRef={trackWrapRef.current} />
                    </TrackDiv>
                  );
                })}
              </TrackGrid>
            </Grid>
          </InfiniteScroll>
        </>
      ) : (
        <>
          <Header topMenu />
          <Container>
            <Flex>
              <Flex
                onClick={() => {
                  props.history.push("/searchKeyword");
                  dispatch(searchActions.resetdata(page));
                }}
              >
                <RiArrowLeftSLine size="30" cursor="pointer"></RiArrowLeftSLine>
              </Flex>
              <Multiline
                ref={inputRef}
                onKeyPress={onKeyPress}
                placeholder="검색어를 두글자 이상 입력해주세요."
                type="text"
                defaultValue={keyword}
              ></Multiline>
              <HiOutlineSearch
                size="30"
                cursor="pointer"
                onClick={onClick}
              ></HiOutlineSearch>
            </Flex>
            <OAODiv>
              <OAOText>검색결과가 없습니다</OAOText>
              <OAOText>다시 한번 검색해주세요!</OAOText>
              <OAO></OAO>
            </OAODiv>
          </Container>
        </>
      )}
    </div>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const Multiline = styled.input`
  border: none;
  background: none;
  border-bottom: solid 3px #ddd;
  padding: 12px 4px;
  width: 100%;
  color: #fff;

  :focus {
    border: none;
    background: none;
    border-bottom: solid 3px var(--point-color);
  }
`;

const Grid = styled.div`
  padding-left: 10px;
  /* @media screen and (max-width: 375px) {
    padding-left: 0px;
  } */
`;

const TrackGrid = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

const TrackDiv = styled.div`
  margin: 0px 10px;
  @media screen and (max-width: 375px) {
    margin: 0 5px;
  }
  @media screen and (max-width: 320px) {
    margin: 0 1px;
  }
`;

const OAODiv = styled.div`
  position: relative;
  margin-top: 120px;
`;

const OAOText = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 12px;
`;

const OAO = styled.div`
  width: 156px;
  height: 156px;
  margin: 40px auto 0px auto;

  background-image: url("/assets/images/OAO.png");
  background-repeat: no-repeat;
  background-size: cover;
`;
export default KeywordSearch;
