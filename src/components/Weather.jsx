import { IoSearch } from "react-icons/io5";
import { BsMoisture } from "react-icons/bs";
import { TbWind } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import axios from "axios"

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false)
    const inputRef = useRef();

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "010d": rain_icon,
        "010n": rain_icon,
        "013d": snow_icon,
        "013n": snow_icon
    }

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name !!")
            return
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
            const res = await axios.get(url)
            // console.log(res);
            // if (!res.ok) {
            //     alert(res.message)
            //     return
            // }

            // const response = await fetch(url)
            // const data = await response.json()
            // console.log(data);
            // const iconCode =res.data.weather[0].icon
            const icon = allIcons[res.data.weather[0].icon] || clear_icon

            setWeatherData({
                humidity: res.data.main.humidity,
                temp: Math.floor(res.data.main.temp),
                min_temp: Math.floor(res.data.main.temp_min),
                max_temp: Math.floor(res.data.main.temp_max),
                city: res.data.name,
                wind: res.data.wind.speed,
                icon: icon,
            })
        } catch (error) {
            console.log("Error in fetching weather Api", error);
        }
    }

    useEffect(() => {
        search("new york")
    }, [])

    return (
        <div className="h-[95vh] w-[30vw] bg-blue-600 rounded-lg">
            <div className="flex items-center justify-center pt-10 ">
                <input type="text" placeholder="City name" ref={inputRef} className="mr-10 p-3 cursor-pointer rounded-3xl w-[70%] border-none" />
                <IoSearch onClick={() => search(inputRef.current.value)} className="text-[50px] cursor-pointer bg-white rounded-3xl p-2" />
            </div>
            <div>
                <img src={weatherData.icon} className="mx-auto" />
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
                <span className="text-5xl text-white">{weatherData.temp} °C</span>
                <span className="text-6xl text-white">{weatherData.city}</span>
            </div>
            <div className="flex justify-center items-cente gap-16 mt-4">
                <span className="text-white text-xl">Min Temp. {weatherData.min_temp} °C </span>
                <span className="text-white text-xl">Max Temp. {weatherData.max_temp} °C</span>
            </div>
            <div className="flex gap-20 mt-6 justify-center items-center">
                <div className="flex gap-4">
                    <BsMoisture className="text-4xl mt-3 text-white" />
                    <div className="flex flex-col">
                        <span className="text-xl text-white">{weatherData.humidity} %</span>
                        <span className="text-xl text-white">Humidity</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <TbWind className="text-5xl mt-2 text-white" />
                    <div className="flex flex-col">
                        <span className="text-xl text-white">{weatherData.wind} km/h</span>
                        <span className="text-xl text-white">Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather