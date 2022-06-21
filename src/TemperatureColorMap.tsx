type TemperatureListType = {
  minTemp: number;
  maxTemp: number;
  color: string;
}[];

export const TemperatureColorList: TemperatureListType = [
  { minTemp: -30, maxTemp: -6, color: `#060c2e` },
  { minTemp: -5.9, maxTemp: -2.7, color: `#558cb2` },
  { minTemp: -2.6, maxTemp: 0.7, color: `#55a7b2` },
  { minTemp: 0.8, maxTemp: 4, color: `#757577` },
  { minTemp: 4.1, maxTemp: 7.4, color: `#A5B1C0` },
  { minTemp: 7.5, maxTemp: 10.8, color: `#eceee2` },
  { minTemp: 10.9, maxTemp: 14.1, color: `#f5e6de` },
  { minTemp: 14.2, maxTemp: 17.4, color: `#c99a48` },
  { minTemp: 17.5, maxTemp: 20.7, color: `#843824` },
  { minTemp: 20.8, maxTemp: 24, color: `#3a0b11` },
  { minTemp: 24.1, maxTemp: 27.3, color: `#624747` },
  { minTemp: 27.4, maxTemp: 40, color: `#402858` },
];

export const getColorInfoByTemp = (
  temp: number,
  temperatureList: TemperatureListType = TemperatureColorList
) => {
  return temperatureList.find((colorInfo) => {
    return temp >= colorInfo.minTemp && temp <= colorInfo.maxTemp;
  });
};
