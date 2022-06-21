import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Raleway", sans-serif;
`;

export const StyledTemperatureItemWrapper = styled.div`
  display: flex;
  max-width: 100vw;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
  justify-content: center;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 200px;
  background-color: #dcdbd9;
  margin-bottom: 20px;
  padding: 24px;
  h2{
    margin-left: 40px;
  }
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

export const TempRowContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const StyledColorLegend = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledColorWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const StyledColorSwatch = styled.div<{background: string, borderRadius: boolean}>`
  display: flex;
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.background ? props.background : '#ffffff' )};
  border-radius: ${(props) => (props.borderRadius ? '6px' : '0' )};
`;

export const StyledColorInfo = styled.div`
  
`;

