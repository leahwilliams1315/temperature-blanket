import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { getColorInfoByTemp } from "./TemperatureColorMap";
import format from "date-fns/format";
import { add } from "date-fns";
import { FormControlLabel, Switch } from "@mui/material";

const APIKEY = `7e7aeba0478349569e7d61d8e1dd16ce`;

const TorontoCoords = {
  lat: 43.6532,
  lon: -79.3832,
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Raleway", sans-serif;
`;

const StyledTemperatureItemWrapper = styled.div`
  display: flex;
  max-width: 100vw;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
  justify-content: center;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  background-color: #85cdcb;
  margin-bottom: 20px;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  border: 1px solid #412f38;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 16px;
`;

const StyledRowItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 250px;
  background-color: #ffffff;
`;

const StyledRowColor = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 6px;
`;

const TempRowContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StyledButton = styled.button<{ blueText?: boolean }>`
  display: flex;
  justify-content: center;
  width: 100px;
  height: 20px;
  border: 1px solid black;
  color: ${({ blueText }) => (blueText ? "#0000FF" : "#8B0000")};
`;

const RowHeader = styled.h2`
  margin: 0;
  padding-left: 15%;
`;

const StyledBlueButton = styled(StyledButton)`
  color: #0000ff;
`;

const celsiusString = "°C";
const fahrenheitString = "°F";

const convertToFahrenheit = (celsius: number) => {
  return Math.round(((celsius * 9) / 5 + 32) * 100) / 100;
};

const TemperatureRow: React.FC<{
  dateTimeString: string;
  temperature: number;
}> = ({ dateTimeString, temperature }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  return (
    <StyledRow>
      <StyledRowItemInfo>
        <RowHeader>
          {format(add(new Date(dateTimeString), { hours: 6 }), "MMMM, do")}
        </RowHeader>
        <TempRowContainer>
          <h3>
            {isCelsius
              ? temperature + celsiusString
              : convertToFahrenheit(temperature) + fahrenheitString}
          </h3>
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                onChange={() => setIsCelsius(!isCelsius)}
              />
            }
            label={isCelsius ? celsiusString : fahrenheitString}
          />
        </TempRowContainer>
      </StyledRowItemInfo>
      <StyledRowColor
        style={{
          backgroundColor: getColorInfoByTemp(temperature)?.color || "white",
        }}
      ></StyledRowColor>
    </StyledRow>
  );
};

const App = () => {
  const getWeatherData = () => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/history/daily?lat=${TorontoCoords.lat}&lon=${TorontoCoords.lon}&key=${APIKEY}&start_date=2022-01-01&end_date=2022-06-08`
      )
      .then((res) => {
        setWeatherData(res.data);
        console.log(res.data);
      });
  };
  const [weatherData, setWeatherData] = useState<{ data: any[] } | null>(null);

  return (
    <StyledContainer>

        <StyledButton blueText>
            Hello World
        </StyledButton>


      <StyledHeader>
        <h2 style={{ marginLeft: 20 }}>Toronto Weather Data</h2>
        <button onClick={getWeatherData}>Get Weather</button>
      </StyledHeader>
      <StyledTemperatureItemWrapper>
        {weatherData?.data.map((day, i) => (
          <TemperatureRow
            key={i}
            temperature={day.temp}
            dateTimeString={day.datetime}
          />
        ))}
      </StyledTemperatureItemWrapper>
    </StyledContainer>
  );
};

export default App;
