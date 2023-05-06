## View

```jsx
// app.js
import { View } from "react-native";

<View style={styles.container}>
	<Text style={styles.text}>Hello from React Native!</Text>
	<StatusBar style="auto" />
</View>;
```

- RN에서 **View는 컨테이너**
- 만들 모든 것들은 `View` Component로 만들 수 있음
- RN에선 <div>태그 등 **html태그를 사용할 수 없음**

## Text

- RN에서 모든 **text**들은 `Text` component에 들어가야함

# Styling

- 기존 ReactJS의 스타일링 방식과 비슷하지만 **일부 style 속성들은 사용할 수 없음**
- e.g. border 사용 불가

## StyleSheet.create()

```jsx
// app.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 28,
		color: "red",
	},
});

// app.js
<Text style={styles.text}>Hello from React Native!</Text>;
```

- 자동완성 제공

## 일반 style object

```jsx
const styles = {
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 28,
	},
};
```

- 자동완성이 제공되지 않음

## Inline styling

```jsx
<View
	style={{
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	}}
>
```
