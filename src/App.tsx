import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  getColorInfoByTemp,
  TemperatureColorList,
} from "./TemperatureColorMap";
import format from "date-fns/format";
import { add } from "date-fns";
import { FormControlLabel, Switch } from "@mui/material";

import {
  StyledColorInfo,
  StyledColorLegend,
  StyledColorSwatch,
  StyledColorWrapper,
  StyledContainer,
  StyledHeader,
  StyledRow,
  StyledRowItemInfo,
  StyledTemperatureItemWrapper,
  TempRowContainer,
} from "./App.styled";

const APIKEY = `7e7aeba0478349569e7d61d8e1dd16ce`;

const TorontoCoords = {
  lat: 43.6532,
  lon: -79.3832,
};

const RowHeader = styled.h2`
  margin: 0;
  padding-left: 15%;
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
      <StyledColorSwatch
        background={getColorInfoByTemp(temperature)?.color || "white"}
        borderRadius
      />
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

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <StyledContainer>
      <StyledHeader>
        <h2>Toronto Weather Data - 2022</h2>
        <StyledColorLegend>
          {TemperatureColorList.map((colorRange) => (
            <StyledColorWrapper>
              <StyledColorSwatch
                background={colorRange.color}
                borderRadius={false}
              />
              <StyledColorInfo>
                <p>Min:{colorRange.minTemp + celsiusString}</p>
                <p>Max: {colorRange.maxTemp + celsiusString}</p>
              </StyledColorInfo>
            </StyledColorWrapper>
          ))}
        </StyledColorLegend>
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
