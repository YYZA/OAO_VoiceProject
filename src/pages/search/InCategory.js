import React from "react";
import styled from "styled-components";
import CategoryModal from "../../components/category/CategoryModal";
import Header from "../../components/category/Header";
import Track from "../../components/mypage/Track";
import { Text } from "../../elements/index";

const InCategory = () => {
  const [show_modal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* <Header topMenu /> */}
      {show_modal && <CategoryModal setShowModal={setShowModal} />}

      <Wrap>
        <Flex style={{ justifyContent: "space-between" }}>
          <Text>카테고리 나레이션</Text>
          <IconTag onClick={openModal}></IconTag>
        </Flex>
        <TagGrid>
          <Tag>
            여성적인
            <ButtonX>x</ButtonX>
          </Tag>
          <Tag>
            여성적인
            <ButtonX>x</ButtonX>
          </Tag>
          <Tag>
            여성적인
            <ButtonX>x</ButtonX>
          </Tag>
        </TagGrid>

        <TrackGrid>
          <TrackDiv>
            <Track />
          </TrackDiv>
          <TrackDiv>
            <Track />
          </TrackDiv>
          <TrackDiv>
            <Track />
          </TrackDiv>
          <TrackDiv>
            <Track />
          </TrackDiv>
        </TrackGrid>

        {/* <VoiceBox>
            <Circle></Circle>
            <Grid>
              <Title>깔끔한 목소리</Title>
              <Name>김명자</Name>
              <Count>
                <Icon></Icon>
                <CountText>132</CountText>
                <Icon></Icon>
                <CountText>20</CountText>
              </Count>
            </Grid>
          </VoiceBox> */}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  max-width: 425px;
  margin: auto;
  padding: 10px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  padding: 0px 10px;
`;

const VoiveBoxGrid = styled.div`
  margin: 10px 0px;
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
`;

const VoiceBox = styled.div`
  float: left;
  margin-bottom: 20px;
`;

const IconTag = styled.div`
  width: 28px;
  height: 28px;
  background-color: #ddd;
`;

const TagGrid = styled.div`
  margin: 10px 8px 0px 15px;
`;

const Tag = styled.div`
  max-width: 100px;
  height: 34px;
  line-height: 34px;
  padding: 0px 12px;
  background-color: #f1134e;
  color: #fff;
  font-size: 12px;
  border-radius: 20px;
  border: none;
  text-align: center;
  align-items: center;
  margin: 0px 12px 30px 0px;
  float: left;
  @media screen and (max-width: 360px) {
    max-width: 75px;
    height: 30px;
    line-height: 30px;
    padding: 0px 12px;
    font-size: 10px;
    border-radius: 20px;
    margin: 0px 12px 30px 0px;
  }
`;

const ButtonX = styled.button`
  border: none;
  width: 12px;
  height: 15px;
  background-color: #f1134e;
  color: #fff;
  margin-left: 4px;
  cursor: pointer;
  @media screen and (max-width: 360px) {
    width: 7px;
    height: 12px;
    font-size: 9px;
  }
`;

const Circle = styled.div`
  width: 115px;
  height: 115px;
  background-color: #acabab;
  /* border: 5px solid #fce300; */
  border-radius: 120px;
  margin: 20px 10px 15px 10px;
`;

const Grid = styled.div`
  padding: 0px 10px;
`;

const Title = styled.div`
  font-size: 15px;
`;

const Name = styled.div`
  font-size: 12px;
  margin: 4px 0px;
`;

const Count = styled.div`
  display: flex;
`;

const Icon = styled.div`
  width: 18px;
  height: 18px;
  background-color: #ddd;
  margin: 4px 6px 0px 0px;
`;

const CountText = styled.div`
  font-size: 12px;
  margin: 4px 12px 0px 0px;
`;

export default InCategory;
