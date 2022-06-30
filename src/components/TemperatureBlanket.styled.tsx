import styled from "styled-components";
import Calendar from "react-calendar";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: system-ui;
  margin: 30px 40px;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 375px;
  background-color: #c3c2c1;
  padding: 24px;
  align-items: center;
  h2 {
    margin: 0;
    font-weight: 200;
    font-size: 30px;
  }
  h4 {
    margin: 0 0 20px 0;
  }
  div {
  
  }
`;

export const StyledHeaderInfo = styled.div`
  margin-bottom: 20px;
  max-width: 750px;
  text-align: center;
`;

export const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  border: 1px solid #412f38;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 16px;
`;

export const StyledRowItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 250px;
  background-color: #ffffff;
`;

export const StyledColorLegend = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0;
`;

export const StyledColorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  :hover {
    p {
      font-weight: bold;
    }
    cursor: pointer;
    animation: pulse 1s;
    animation-timing-function: linear;
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
        100% {
          transform: scale(1);
        }
      }
    }
  }
`;

export const StyledColorSwatch = styled.div<{
  background: string;
  borderRadius: boolean;
  height: string;
  width: string;
}>`
  display: flex;
  height: ${(props) => (props.height ? props.height : "0")};
  width: ${(props) => (props.width ? props.width : "0")};
  background-color: ${(props) =>
    props.background ? props.background : "#ffffff"};
  border-radius: ${(props) => (props.borderRadius ? "6px" : "0")};
  background-image: repeating-linear-gradient(
    11deg,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.25) 1px,
    transparent 0px,
    transparent 4px
  );
  background-size: 8px;
`;


export const TempRowContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const StyledCalendarColor = styled.div<{ background: string }>`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  margin-top: 6px;
  background-color: ${(props) =>
    props.background ? props.background : "#ffffff"};
`;

export const StyledColorInfo = styled.div`
  font-weight: 300;
`;

export const RowHeader = styled.h2`
  margin: 0;
  padding-left: 0;
  font-size: 16px;
  font-weight: 600;
`;

export const StyledCalendar = styled(Calendar)`
  width: 100%;
  .react-calendar__tile abbr {
    display: none;
  }
  .react-calendar__navigation {
    display: none;
  }
  .react-calendar__tile--active {
    background: unset;
    color: unset;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: unset;
  }
`;
