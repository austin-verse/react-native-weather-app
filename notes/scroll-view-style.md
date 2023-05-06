# scroll-view style

## Scroll view

- 웹과 다르게 React Native에선 컨텐츠 길이에 따른 **자동 scroll이 기본값으로 설정되어있지 않음**
- 스크롤을 하기 위해선 `View` 컴포넌트가 아닌 `ScrollView` 컴포넌트를 사용해야함

```jsx
import { ScrollView, StyleSheet, Dimensions, Text, View } from "react-native";

// 스크린의 사이즈 가져오기
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.city}>
				<Text style={styles.cityName}>Seoul</Text>
			</View>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				horizontal
				contentContainerStyle={styles.weather}
			>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
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
});
```

- `ScrollView` 컴포넌트에선 `style` prop이 아닌 `contentContainerStyle` prop을 사용해야 스타일을 적용시킬 수 있음
- `ScrollView` 컴포넌트엔 `flex: number` 값을 주면 안됨 - `ScrollView` 컴포넌트는 스크린보다 커야하기 때문

### ScrollView props

- `contentContainerStyle`: 일반 `View` 컴포넌트에서 사용하는 `style`과 같은 용도, `ScrollView` 컴포넌트에선 `contentContainerStyle` 사용
- `horizontal`: 가로로 스크롤
- `pagingEnabled`: 스크롤을 자유롭게 하지 못하게 하는 대신, 페이지를 생성해줌
- `showsHorizontalScrollIndicator={false}`: 가로 스크롤 바를 없애줌
