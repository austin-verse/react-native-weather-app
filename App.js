import { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Dimensions,
	Text,
	View,
	ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";

// 스크린의 사이즈 가져오기
const { width: SCREEN_WIDTH } = Dimensions.get("window");

// API KEY from .env
import { API_KEY } from "@env";

export default function App() {
	// 현재 위치
	const [city, setCity] = useState("Loading...");

	// 날짜별 (총 5일) 날씨 정보
	const [days, setDays] = useState([]);

	// Granted 여부 확인
	const [ok, setOk] = useState(true);

	const getWeather = async () => {
		// requestForegroundPermissionsAsync: 앱 사용중에만 위치 사용 권한 허용 요청
		const { granted } = await Location.requestForegroundPermissionsAsync();
		if (!granted) {
			setOk(false);
		}
		// 사용자 latitude, longitude 가져오기
		const {
			coords: { latitude, longitude },
		} = await Location.getCurrentPositionAsync({ accuracy: 5 });

		// 가져온 latitude, longitude를 통해 사용자 위치(도시명) 가져오기
		const location = await Location.reverseGeocodeAsync(
			{
				latitude,
				longitude,
			},
			{ useGoogleMaps: false }
		);

		// 가져온 도시 정보를 통해 city state에 저장
		setCity(location[0].city);

		// 가져온 latitude, longitude를 통해 날씨 정보 fetch
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
		);
		const json = await response.json();
		setDays(
			// 각 day의 날씨 정보 중 0시의 날씨 정보만 days state에 저장
			json.list.filter((weather) => {
				if (weather.dt_txt.includes("00:00:00")) {
					return weather;
				}
			})
		);
	};

	useEffect(() => {
		getWeather();
	});
	return (
		<View style={styles.container}>
			<View style={styles.city}>
				<Text style={styles.cityName}>{city}</Text>
			</View>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				horizontal
				contentContainerStyle={styles.weather}
			>
				{/* 날씨 정보가 fetch 완료되기 전 */}
				{days.length === 0 ? (
					<View style={styles.day}>
						<ActivityIndicator
							color="white"
							style={{
								marginTop: 10,
							}}
							size="large"
						/>
					</View>
				) : (
					days.map(function (day, index) {
						// 날씨 정보가 fetch완료 되었을 때
						return (
							<View key={index} style={styles.day}>
								<Text style={styles.temp}>
									{parseFloat(day.main.temp).toFixed(1)}
								</Text>
								<Text style={styles.description}>{day.weather[0].main}</Text>
								<Text style={styles.tinyDescription}>
									{day.weather[0].description}
								</Text>
							</View>
						);
					})
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "tomato" },
	city: {
		flex: 1.2,
		justifyContent: "center",
		alignItems: "center",
	},
	cityName: {
		fontSize: 68,
		fontWeight: "500",
	},
	weather: {},
	day: {
		width: SCREEN_WIDTH,
		alignItems: "center",
	},
	temp: {
		marginTop: 50,
		fontSize: 178,
	},
	description: {
		marginTop: -30,
		fontSize: 60,
	},
	tinyDescription: {
		marginTop: 10,
		fontSize: 20,
	},
});
