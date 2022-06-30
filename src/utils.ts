import format from "date-fns/format";
import { WeatherDataType } from "./store";
import axios from "axios";

export const celsiusString = "°C";
export const fahrenheitString = "°F";

export const convertToFahrenheit = (celsius: number) => {
  return Math.round(((celsius * 9) / 5 + 32) * 100) / 100;
};


export type WeatherDataAsMonthIndex = {
  [monthString: string]: {
    [dayNumber: string]: WeatherDataType;
  };
};

export const structureWeatherDataByMonth = (
  weatherDataByDates: WeatherDataType[]
): WeatherDataAsMonthIndex => {
  return weatherDataByDates.reduce((acc: WeatherDataAsMonthIndex, curr) => {
    const dateWithoutTimezoneOffset = new Date(curr.datetime);
    const dateWithFixedTimezoneOffset = new Date(
      dateWithoutTimezoneOffset.getTime() +
        dateWithoutTimezoneOffset.getTimezoneOffset() * 60000
    );
    const month = format(dateWithFixedTimezoneOffset, "MMMM");
    const day = format(dateWithFixedTimezoneOffset, "dd");
    if (!acc[month]) {
      acc[month] = {};
    }
    if (!acc[month][day]) {
      acc[month][day] = curr;
    }
    return acc;
  }, {});
};

export const getWeatherData = () => {
  const APIKEY = `7e7aeba0478349569e7d61d8e1dd16ce`;

  const TorontoCoords = {
    lat: 43.6532,
    lon: -79.3832,
  };
  return axios
    .get(
      `https://api.weatherbit.io/v2.0/history/daily?lat=${TorontoCoords.lat}&lon=${TorontoCoords.lon}&key=${APIKEY}&start_date=2022-01-01&end_date=2022-06-30`
    )
    .then((res) => res.data.data)
    .then((weatherDataByDates: WeatherDataType[]) => {
      // dispatch(setWeatherData(weatherDataByDates));

      localStorage.setItem("weatherData", JSON.stringify(weatherDataByDates));

      return weatherDataByDates;
    })
    .catch(() => {
      return JSON.parse(localStorage.getItem("weatherData") || "{}");
    });
};
