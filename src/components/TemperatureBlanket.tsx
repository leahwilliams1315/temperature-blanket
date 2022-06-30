import React, { useEffect, useState } from "react";
import { getColorInfoByTemp } from "../TemperatureColorMap";
import format from "date-fns/format";
import { endOfMonth, startOfMonth } from "date-fns";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "react-calendar/dist/Calendar.css";
import {
  StyledColorInfo,
  StyledColorLegend,
  StyledColorSwatch,
  StyledColorWrapper,
  StyledContainer,
  StyledHeader,
  StyledCalendar,
  StyledHeaderInfo,
} from "./TemperatureBlanket.styled";
import { useDispatch, useSelector } from "react-redux";
import { RootState, selectedTemperatureRange, setWeatherData } from "../store";
import {
  celsiusString,
  getWeatherData,
  structureWeatherDataByMonth,
} from "../utils";
import { TemperatureDateTile } from "./TemperatureDateTile";

const TemperatureBlanket = () => {
  const [expandedMonths, setExpandedMonths] = useState<{
    [month: string]: boolean;
  }>({});

  const dispatch = useDispatch();
  // selectors to get data from state, used to populate the calendar and the legend
  const temperatureColourList = useSelector(
    (state: RootState) => state.temperatureColourList
  );

  const weatherDates = useSelector(
    (state: RootState) => state.weatherData.temperatureDates
  );
  console.log(weatherDates, "dates");

  const currentTemperatureRange = useSelector(
    (state: RootState) => state.weatherData.selectedTemperatureRange
  );

  const indexedWeatherData = structureWeatherDataByMonth(weatherDates);

  const monthsWithMostDatesInRange = Object.keys(indexedWeatherData)
    .filter((month) => {
      const monthData = indexedWeatherData[month];
      return (
        !!currentTemperatureRange &&
        Object.values(monthData).some(
          ({ temp }) =>
            temp >= currentTemperatureRange.minTemp &&
            temp <= currentTemperatureRange.maxTemp
        )
      );
    })
    .map((month) => ({
      monthName: month,
      dates: currentTemperatureRange
        ? Object.keys(indexedWeatherData[month]).filter(
            (day) =>
              indexedWeatherData[month][day].temp >=
                currentTemperatureRange.minTemp &&
              indexedWeatherData[month][day].temp <=
                currentTemperatureRange.maxTemp
          )
        : [],
    }));

  const monthsWithMostDatesInTemperatureRange =
    monthsWithMostDatesInRange.reduce(
      (acc: { dates: string[]; monthName: string }[], curr) => {
        // if it's an array we already have our first month
        if (Array.isArray(acc) && acc.length !== 0) {
          if (curr.dates.length === acc[0].dates.length) {
            return [...acc, curr];
          } else if (curr.dates.length > acc[0].dates.length) {
            return [curr];
          } else {
            return acc;
          }
        } else {
          return [curr];
        }
      },
      []
    );

  console.log(monthsWithMostDatesInRange);
  console.log(monthsWithMostDatesInTemperatureRange);

  useEffect(() => {
    setExpandedMonths(
      monthsWithMostDatesInTemperatureRange.reduce((acc, curr) => {
        return {
          ...acc,
          [curr.monthName]: true,
        };
      }, {})
    );
  }, [
    monthsWithMostDatesInTemperatureRange.reduce(
      (acc, curr) => acc.concat(curr.monthName),
      ""
    ),
  ]);

  useEffect(() => {
    getWeatherData().then((data) => {
      dispatch(setWeatherData(data));
    });
  }, []);

  return (
    <StyledContainer>
      <StyledHeader>
        <h2>Toronto Weather Data - Temperature Blanket 2022</h2>
        <StyledHeaderInfo>
          This is a visual representation of the average daily temperature of
          2022. The first accordion item shows the corresponding colour for the
          average temperature of each day and shows what the temperature blanket
          looks like so far.
        </StyledHeaderInfo>
        <StyledColorLegend>
          {temperatureColourList.map((colorRange) => (
            <StyledColorWrapper
              onClick={() => {
                setExpandedMonths({});
                dispatch(selectedTemperatureRange(colorRange));
              }}
            >
              <StyledColorSwatch
                height={"100px"}
                width={"100px"}
                background={colorRange.color}
                borderRadius={false}
              />
              <StyledColorInfo>
                <p style={{ marginBottom: 0 }}>
                  Min: {colorRange.minTemp + celsiusString}
                </p>
                <p style={{ marginTop: "10px" }}>
                  Max: {colorRange.maxTemp + celsiusString}
                </p>
              </StyledColorInfo>
            </StyledColorWrapper>
          ))}
        </StyledColorLegend>
        <div>
          Click a colour to see the month with the highest number of that
          temperature range!
        </div>
      </StyledHeader>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Colours of the Blanket</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {weatherDates.map((day) => (
              <StyledColorSwatch
                height={"20px"}
                width={"100%"}
                borderRadius
                background={
                  (day.temp && getColorInfoByTemp(day.temp)?.color) || "white"
                }
              />
            ))}
          </AccordionDetails>
        </Accordion>

        {Object.keys(indexedWeatherData || {}).map((month) => (
          <Accordion
            expanded={expandedMonths[month] || false}
            onClick={() =>
              setExpandedMonths({
                ...expandedMonths,
                [month]: !expandedMonths[month],
              })
            }
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{month}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <StyledCalendar
                defaultView="month"
                value={[
                  startOfMonth(new Date(`${month} 15 2022`)),
                  endOfMonth(new Date(`${month} 15 2022`)),
                ]}
                tileContent={({ date }) => (
                  <TemperatureDateTile
                    temperature={
                      indexedWeatherData?.[format(date, "MMMM")]?.[
                        date.getDate().toLocaleString("en-US", {
                          minimumIntegerDigits: 2,
                          useGrouping: false,
                        })
                      ]?.temp
                    }
                    dateTimeString={date.toISOString()}
                  />
                )}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </StyledContainer>
  );
};

export default TemperatureBlanket;
