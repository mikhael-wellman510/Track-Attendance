import "../../css/content.css";
import { Box, Center, Flex, Icon } from "@chakra-ui/react";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { getJam } from "../../actions/jamAction";

export default function Content() {
  const [clockIn, setClockIn] = useState([]);
  const [toClock, setToClock] = useState({ date: "", clock: "", icon: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getJam({
        user_id: 1,
      })
    );
  }, []);

  function addClock() {
    const tempArr = [...clockIn];
    tempArr.push(toClock);
    setClockIn(tempArr);

    setToClock({ date: "", clock: "", icon: "" });
  }
  console.log(addClock);

  const [time, setTime] = useState(moment());
  const Clock = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(moment());
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
      <div>
        <Center fontSize={"30px"} fontWeight={"bold"} color={"white"}>
          {time.format("LTS")}
        </Center>
      </div>
    );
  };

  function inputHandler(event) {
    const { value, id } = event.target;
    const tempObj = { ...toClock };
    tempObj[id] = value;
    setToClock(tempObj);
  }

  const [date, setDate] = useState(moment());
  const Date = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        setDate(moment());
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
      <div>
        <Center>{date.format("LL")}</Center>
      </div>
    );
  };

  return (
    <Center h={"100vh"} w={"100vw"}>
      <Box id="boxLogin" w={"390px"} h={"844px"}>
        <Box h={"422px"} bg={"rgb(191,41,53)"} borderRadius={"30px"}>
          <Center
            paddingTop={"40px"}
            paddingBottom={"20px"}
            fontSize={"30px"}
            color={"white"}
          >
            Live Attendance
          </Center>
          <Center color={"white"}>{Date()}</Center>
          <Center id="date" onChange={inputHandler} value={toClock.date}>
            {Clock()}
          </Center>
          <Center>
            <Box
              id="boxCheck"
              w={"350px"}
              padding={"15px"}
              borderRadius={"15px"}
            >
              <Flex justifyContent={"center"} flexDir={"column"} gap={"5px"}>
                <Center color={"#9a9a9a"}>Schedule: {Date()}</Center>
                <Center fontWeight={"bold"}>SH2OPA</Center>
                <Center fontWeight={"bold"} fontSize={"22"}>
                  08:00 - 17:00
                </Center>
                <Center color={"#617aca"}>
                  See 1 other attendance location
                </Center>
                <Center
                  bg={"rgb(224,235,247)"}
                  borderRadius={"15px"}
                  color={"#787677"}
                >
                  Selfie photo is required to Clock In/Out
                </Center>
                <Flex justifyContent={"center"} gap={"15px"}>
                  <Flex
                    w={"100%"}
                    h={"50px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    bg={"#035ebf"}
                    borderRadius={"10px"}
                    color={"white"}
                    onClick={addClock}
                    cursor={"pointer"}
                  >
                    Clock In
                  </Flex>
                  <Flex
                    w={"100%"}
                    h={"50px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    bg={"#035ebf"}
                    borderRadius={"10px"}
                    color={"white"}
                    onClick={addClock}
                    cursor={"pointer"}
                  >
                    Clock Out
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Center>
        </Box>

        <Box>
          <Flex justifyContent={"space-between"} w={"100%"} padding={"15px"}>
            <Flex fontSize={"22px"}>Attendance Log</Flex>
            <Flex color={"#9a9a9a"}>View Log</Flex>
          </Flex>
          {clockIn.map((val) => (
            <Log {...val} />
          ))}
        </Box>
      </Box>
    </Center>
  );
}

function Log(props) {
  return (
    <div>
      <Flex
        justifyContent={"space-between"}
        w={"100%"}
        paddingLeft={"15px"}
        paddingRight={"15px"}
        alignItems={"center"}
        borderBottom={"1px"}
      >
        <Flex flexDir={"column"} w={"70px"}>
          <Flex>07:30</Flex>
          <Flex>17 May</Flex>
        </Flex>
        <Flex w={"70px"} justifyContent={"center"} id="clock">
          Clock In
        </Flex>
        <Flex w={"70px"} justifyContent={"end"} id="icon">
          <Icon as={IoIosArrowForward}></Icon>
        </Flex>
      </Flex>
    </div>
  );
}
