# layout system

## Container View는 기본적으로 Flex container

- 기존 웹에선 부모 컴포넌트에 `display: flex`를 사용해야 flex container로 사용가능
- RN에선 기본적으로 Container View가 flex container로 지정되어있음
- **Flex direction**의 기본값은 모두 **column** (웹에선 row)
- 기본적으로 **overflow를 스크롤할 수 없음**

## React Native 레아이웃 시스템 - flex: number

- RN에서 대부분의 경우 **너비와 높이에 기반에 레이아웃을 만들지 않음**
  - width와 height를 대부분 사용하지 않음

```jsx
// app.js

import { View } from "react-native";

export default function App() {
	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1, backgroundColor: "tomato" }}></View>
			<View style={{ flex: 1, backgroundColor: "teal" }}></View>
			<View style={{ flex: 1, backgroundColor: "orange" }}></View>
		</View>
	);
}
```

- width, height가 아닌 **비율로 표현**
- 자식 `View` 컴포넌트는 크기가 동일하도록 조절됨 (1:1:1 비율)
