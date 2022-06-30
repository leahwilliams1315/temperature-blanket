import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TemperatureColorList } from "../TemperatureColorMap";

export type WeatherDataType = {
  temp: number;
  datetime: string;
};

const temperatureColourListReducer = (state = TemperatureColorList) => {
  return state;
};

type InitialWeatherDataStateType = {
  temperatureDates: WeatherDataType[];
  selectedTemperatureRange: { minTemp: number; maxTemp: number } | null;
};

const initialWeatherDataState: InitialWeatherDataStateType = {
  temperatureDates: [],
  selectedTemperatureRange: null,
};

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState: initialWeatherDataState,
  reducers: {
    selectedTemperatureRange: (state, action: PayloadAction<{
        minTemp: number;
        maxTemp: number;
    }>) => {
      return {
        ...state,
        selectedTemperatureRange: action.payload,
      };
    },
    setWeatherData: (state, action: PayloadAction<WeatherDataType[]>) => {
      return {
        ...state,
        temperatureDates: action.payload,
      };
    },
  },
});

export const store = configureStore({
  reducer: {
    weatherData: weatherDataSlice.reducer,
    temperatureColourList: temperatureColourListReducer,
  },
});

export const { setWeatherData, selectedTemperatureRange } = weatherDataSlice.actions;

export type RootState = ReturnType<typeof store.getState>;