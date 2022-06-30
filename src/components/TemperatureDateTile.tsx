import React, { useState } from "react";
import {
  RowHeader,
  StyledCalendarColor,
  StyledRow,
  StyledRowItemInfo,
  TempRowContainer,
} from "./TemperatureBlanket.styled";
import format from "date-fns/format";
import { add } from "date-fns";
import { FormControlLabel, Switch } from "@mui/material";
import { getColorInfoByTemp } from "../TemperatureColorMap";
import { celsiusString, convertToFahrenheit, fahrenheitString } from "../utils";

export const TemperatureDateTile: React.FC<{
  dateTimeString: string;
  temperature?: number;
}> = ({ dateTimeString, temperature }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  return (
    <StyledRow>
      <StyledRowItemInfo>
        <RowHeader>
          {format(add(new Date(dateTimeString), { hours: 2 }), "MMM, do")}
        </RowHeader>
        <TempRowContainer>
          {temperature && (
            <h4>
              {isCelsius
                ? temperature + celsiusString
                : convertToFahrenheit(temperature) + fahrenheitString}
            </h4>
          )}
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                onChange={() => setIsCelsius(!isCelsius)}
              />
            }
            label={isCelsius ? celsiusString : fahrenheitString}
          />
          <StyledCalendarColor
            background={
              (temperature && getColorInfoByTemp(temperature)?.color) || "white"
            }
          />
        </TempRowContainer>
      </StyledRowItemInfo>
    </StyledRow>
  );
};
