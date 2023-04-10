import { useEffect, useState } from "react";
import {
  FaSun,
  FaCloudSun,
  FaCloud,
  FaCloudMeatball,
  FaCloudSunRain,
  FaCloudShowersHeavy,
  FaPooStorm,
  FaSnowflake,
  FaSmog,
} from "react-icons/fa";
import axios from "axios";

const weatherIcon = {
  "01": <FaSun size={96} />,
  "02": <FaCloudSun size={96} />,
  "03": <FaCloud size={96} />,
  "04": <FaCloudMeatball size={96} />,
  "09": <FaCloudSunRain size={96} />,
  10: <FaCloudShowersHeavy size={96} />,
  11: <FaPooStorm size={96} />,
  13: <FaSnowflake size={96} />,
  50: <FaSmog size={96} />,
};

function Weather() {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [weatherInfo, setWeatherInfo] = useState();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      // 성공, 실패
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      () => {
        alert("위치 정보에 동의 해주셔야 합니다.");
      }
    );
  };

  const getWeatherInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
      );

      if (response.status !== 200) {
        alert("날씨 정보를 가져오지 못했습니다.");

        return;
      }
      // 통과되면 실행
      console.log(response.data);
      setWeatherInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGeolocation();
  }, []);
  useEffect(() => {
    if (!lat || !lon) return;

    getWeatherInfo();
  }, [lat, lon]);
  useEffect(() => console.log(lat), [lat]);
  useEffect(() => console.log(lon), [lon]);
  useEffect(() => {
    console.log(process.env.REACT_APP_WEATHER_API);
  }, []);
  // process.env.REACT_APP_WEATHER_API는 환경변수이기때문에 app이 실행되자마자 값이 정해지는거라 디펜던시([])를 추적할 필요가 없다.
  // -> 초기값만 제대로 설정하면 됨(.env)

  return (
    <div className="bg-red-100 min-h-screen flex justify-center items-center">
      {weatherInfo ? (
        <div className="flex flex-col justify-center items-center">
          {weatherIcon[weatherInfo.weather[0].icon.substring(0, 2)]}
          <div className="mt-8 text-2xl">
            {weatherInfo.name},{" "}
            {weatherInfo.main.temp.toString().substring(0, 4)} ℃
          </div>
        </div>
      ) : (
        "정보 로딩중 ..."
      )}
    </div>
  );
}

export default Weather;
