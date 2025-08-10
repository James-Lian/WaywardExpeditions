// using OpenMeteo - no API key! https://open-meteo.com/en/docs
import { fetchWeatherApi } from 'openmeteo';
import * as Location from 'expo-location';


export function translateWeatherCode(code: number | string) {
    const weatherDescriptions: {[key: string] : string} = {
        '0': "Clear sky",
        '1': "Mainly clear", 
        '2': "Partly cloudy", 
        '3': "Overcast",
        '45': "Fog", 
        '48': "Freezing fog",
        '51': "Light drizzle", 
        '53': "Moderate drizzle", 
        '55': "Dense drizzle",
        '56': "Light freezing drizzle", 
        '57': "Dense freezing drizzle",
        '61': "Slight rain", 
        '63': "Moderate rain", 
        '65': "Heavy rain",
        '66': "Light freezing rain", 
        '67': "Heavy freezing rain",
        '71': "Slight snow fall", 
        '73': "Moderate snow fall", 
        '75': "Heavy snow fall",
        '77':	"Snow grains",
        '80': "Slight rain showers", 
        '81': "Moderate rain showers", 
        '82': "Violent rain showers",
        '85': "Slight snow showers", 
        '86': "Heavy snow showers",
        '95': "Thunderstorms",
    }

    if (weatherDescriptions.hasOwnProperty(code)) {
        // console.log(weatherDescriptions[code.toString()]);
        return weatherDescriptions[code.toString()];
    } else {
        return null;
    }
}

interface WeatherProps {
    latitude?: number,
    longitude?: number,
    forecast_days?: number,
    // current?: Array<string>,
    // hourly?: Array<string>,
}

export interface WeatherData {
    current: {
        time: Date;
        temperature_2m: number;
        relative_humidity_2m: number;
        apparent_temperature: number;
        is_day: number;
        wind_speed_10m: number;
        precipitation: number;
        rain: number;
        showers: number;
        snowfall: number;
        weather_code: number;
    };
    hourly: {
        time: Date[],
        precipitation_probability: Float32Array<ArrayBufferLike> | null,
        precipitation: Float32Array<ArrayBufferLike> | null,
        rain: Float32Array<ArrayBufferLike> | null,
        showers: Float32Array<ArrayBufferLike> | null,
        snowfall: Float32Array<ArrayBufferLike> | null,
        snow_depth: Float32Array<ArrayBufferLike> | null,
        visibility: Float32Array<ArrayBufferLike> | null,
        uv_index: Float32Array<ArrayBufferLike> | null,
        uv_index_clear_sky: Float32Array<ArrayBufferLike> | null,
        is_day: Float32Array<ArrayBufferLike> | null,
        wind_speed_10m: Float32Array<ArrayBufferLike> | null,
        weather_code: Float32Array<ArrayBufferLike> | null
    }
}

export default async function getWeather( props?: WeatherProps ) {
    let location = { coords: {latitude: 0, longitude: 0} };
    if (!props?.latitude || !props?.longitude) {
        location = await Location.getCurrentPositionAsync({});
        // console.log(location.coords.latitude, location.coords.longitude)
    }
    
    const params = {
        "latitude": (props?.latitude && props?.longitude ? props.latitude : location.coords.latitude),
        "longitude": (props?.latitude && props?.longitude ? props.longitude : location.coords.longitude),
        "models": "best_match",
        "forecast_days": props?.forecast_days ? props?.forecast_days : 1,
        "hourly": ["precipitation_probability", "precipitation", "rain", "showers", "snowfall", "snow_depth", "visibility", "uv_index", "uv_index_clear_sky", "is_day", "wind_speed_10m", "weather_code"],
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "wind_speed_10m", "precipitation", "rain", "showers", "snowfall", "weather_code"],
    }

    // console.log(params);

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const utcOffsetSeconds = response.utcOffsetSeconds();
    
    // console.log(
    //     `\nCoordinates: ${latitude}°N ${longitude}°E`,
    //     `\nElevation: ${elevation}m asl`,
    //     `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
    //     `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    // );
    
    const current = response.current()!;
    const hourly = response.hourly()!;
    
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData: WeatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature_2m: current.variables(0)!.value(),
            relative_humidity_2m: current.variables(1)!.value(),
            apparent_temperature: current.variables(2)!.value(),
            is_day: current.variables(3)!.value(),
            wind_speed_10m: current.variables(4)!.value(),
            precipitation: current.variables(5)!.value(),
            rain: current.variables(6)!.value(),
            showers: current.variables(7)!.value(),
            snowfall: current.variables(8)!.value(),
            weather_code: current.variables(9)!.value(),
        },
        hourly: {
            time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            precipitation_probability: hourly.variables(0)!.valuesArray(),
            precipitation: hourly.variables(1)!.valuesArray(),
            rain: hourly.variables(2)!.valuesArray(),
            showers: hourly.variables(3)!.valuesArray(),
            snowfall: hourly.variables(4)!.valuesArray(),
            snow_depth: hourly.variables(5)!.valuesArray(),
            visibility: hourly.variables(6)!.valuesArray(),
            uv_index: hourly.variables(7)!.valuesArray(),
            uv_index_clear_sky: hourly.variables(8)!.valuesArray(),
            is_day: hourly.variables(9)!.valuesArray(),
            wind_speed_10m: hourly.variables(10)!.valuesArray(),
            weather_code: hourly.variables(11)!.valuesArray(),
        },
    };
    
    // 'weatherData' now contains a simple structure with arrays with datetime and weather data
    // console.log(
    //     `\nCurrent time: ${weatherData.current.time}`,
    //     `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
    //     `\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
    //     `\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
    //     `\nCurrent is_day: ${weatherData.current.is_day}`,
    //     `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
    //     `\nCurrent precipitation: ${weatherData.current.precipitation}`,
    //     `\nCurrent rain: ${weatherData.current.rain}`,
    //     `\nCurrent showers: ${weatherData.current.showers}`,
    //     `\nCurrent snowfall: ${weatherData.current.snowfall}`,
    //     `\nCurrent weather_code: ${weatherData.current.weather_code}`,
    // );
    // console.log("\nHourly data", weatherData.hourly);

    return weatherData;
}

