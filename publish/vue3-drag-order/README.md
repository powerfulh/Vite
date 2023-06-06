# vue3-drag-order
## Vue3 목록 요소 드래그 정렬

같은 데이타 배열을 공유하는 요소들에 두가지의 드래그 정렬 기능을 추가할 수 있다

***

### 제공 함수

* dragToDrop
* drag

### 공통 인자

* dragList: Array\<HTMLElement>
	* 드래그 기능을 추가할 요소로 구성된 배열
* dataList: Ref<Array\<any>>
	* dragList와 공유하는 데이타에 해당하는 배열 (주로 *v-for* 속성과 함께 사용)
* consoleForDev?: Boolean
	* 개발에 도움을 줄 console 함수를 호출할지 여부 (mode가 운영 환경이 아닐 경우로 생각하면 좋다)
	* 예를 들어 위의 dataList 인자에 담긴 Array length가 0이면 콘솔에 오류를 찍는다 (기능을 추가할 대상이 없기 때문에)
	* 옵션이므로 호출하지 않으려면 없어도 된다

***

#### dragToDrop

드래그한 요소와 드롭한 요소를 맞바꾼다

#### drag

드래그중인 요소를 현재 위치로 옮긴다