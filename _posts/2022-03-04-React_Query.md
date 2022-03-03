---
title: React Query
name: ludacirs
link: https://github.com/ludacirs
date: 2022-03-04 03:08:00 +0900
categories: [React, React-Query]
tags: [React, React-Query, state]
---

# React-Query

## 상태 분리하기

리액트를 다룰 때 상태를 이용해서 뷰를 렌더링한다.

프론트에서 표현하는 데이터가 많아지면서 상태도 상당히 늘어났다. 그중 대표적인 것이 서버에서 받아오는 데이터

이러한 데이터들은 보통 전역에서 관리해야되거나, 복잡한 로직을 가지고 있는 경우가 많기 때문에 상태관리 라이브러리의 힘을 빌리는 경우가 많다.

많은 경우 리덕스의 미들웨어를 사용해서 이를 해결해왔다.

이런 흐름으로 자연스럽게 API 통신을 위한 코드는 전역 상태관리 라이브러리(리덕스)에게 위임하는게 당연시 되어버렸는데

클라이언트 내부에서만 선언하고 다루어지며 항상 최신의 상태로 업데이트되어 뷰에 반영되는 상태와 
서버 데이터의 스냅샷을 불러와서 최신임을 보장할 수 없고 모두가 다룰 수 있어 최신임을 보장할 수 없는 상태

이 둘은 다른 방식으로 다루어야 효율적인 앱을 만들 수 있다... 해서 나온 것이 `React-Query`, `SWR`, `RTK-Query` 등과 같은 라이브러리들이다.

## 무엇?

처음에는 위의 개념을 보고는 아 요즘엔 이런식으로 개발하는구나 생각하고있다가

next.js로 진행하고 있는 사이드 프로젝트에서 SSG로 스태틱 페이지만 뽑아내고 있다가 SSR로 개발해야되는 페이지가 생겨서 저런식으로 개발하기로 마음을 먹었다.

## React-Query

리덕스를 사용해본적이 있는데다가 가장 대중적이고 정보량도 많을 거라는 생각에 리덕스로 클라이언트 상태 + 리덕스 쿼리로 서버 상태 관리를 할 셈이었는데 공식 문서를 읽고 적용해봐도 잘 안되고.. 검색해봐도 정보량이 얼마 나오지 않아서 포기하고 React-Query를 사용하기로 결정

간략하게 요약하면 React-Query는 서버에서 가져온 데이터의 스냅샷을 정해진 기간(staleTime)만큼 캐싱(저장)해서 보관하고 있다가 기간이 넘어가면 해당 스냅샷을 업데이트(refetch)해주는 과정을 처리해주는 라이브러리라고 할 수 있다.

배우며 헷갈렸던 부분만 간단히 적어보면

### 어휘 및 개념

- fresh: 새롭게 추가된 쿼리 인스턴스로 가장 최신의 상태를 말한다. 추가된 시점부터 active이며 이를 기준으로 설정해준 staleTime(기본값 0)에 따라서 fresh =>stale 상태로 변한다.
- feching: 요청, 재요청 수행중인 쿼리
- loading: 데이터가 없는 상태에서의 (첫)요청을 수행 중인 쿼리
- inactive: 컴포넌트가 언마운트 되고 나서의 쿼리 상태를 가르킨다. cacheTime(기본값 5분)동안 데이터가 캐싱된다. cacheTime이 넘어가면 캐시에서 delete된다.

### 생명 주기

fetching => active(fresh state) => (staleTime => stale state =>) unmount => inactive => cacheTime => delete

### stale vs cache

staleTime이 지난 쿼리는 말대로 stale한 상태가 되며 refetch의 대상이된다.

1. staleTime이 지난 query는 컴포넌트가 재렌더링될 때 refetch된다.
2. staleTime이 지나지 않은 query는 컴포넌트가 재렌더링될 때 refetch하지 않고 캐시된 데이터를 가져온다.
3. staleTime이 지나지 않은 query의 컴포넌트가 언마운트되고 cacheTime이 지나기전에 재렌더링될 때 refetch하지 않고 캐시된 데이터를 가져온다.
4. staleTime이 지난 query의 컴포넌트가 언마운트되고 cacheTime이 지나기전에 재렌더링될 때 캐시된 데이터를 가져와서 보여주고 refetch 후에 데이터를 최신 값으로 바꾼다.

- staleTime이 무기한인 경우 QueryClient 인스턴스로 invalidate(키값)으로 리패칭할 수 있다.

### queries 파일은 분리

컴포넌트 내부에서 사용하면 키 등 때문에 관리가 힘들 수 있다. 도메인 별로 분리를 추천

### 동일한 키값을 가진 쿼리들은 모두 상태를 공유한다.

staleTime이 100초인 쿼리를 A 컴포넌트에서 부르고 100초 내에 B 컴포넌트에서 동일한 키값을 가진 쿼리를 불러오면 패칭하지 않고 캐시된 데이터를 가져온다.
	-> React Query가 내부적으로 Context API를 사용하기 때문에 마치 전역 상태관리하는 것 처럼 사용할 수 있음. 

### 자주 사용되는 옵션

- onSucess : 성공했을 때 실행될 콜백을 정의
- onError: 에러가 발생했을 때 실행될 콜백을 정의
- onSettled: 완료시의 실행될 콜백을 정의
- select: 성공시 가져온 데이터를 가공하는 콜백을 정의
- refetchInterval: 주기적으로 refetch할지 결정하는 옵션
- enabled: 기본적으로 쿼리가 담긴 컴포넌트가 마운트될 때 쿼리가 실행되는데 이 옵션을 false로 주면 안함

### useMutation

CRUD에서 CUD의 API 요청 할 때 사용

- onMutate: Optimistic update(낙관적 업데이트) 내가 보낸 요청이 성공할 것이라고 보고 성공을 예상하여 UI나 다른 로직을 미리 실행시킬 수 있다. 만약 성공하지 못하고 실패하면...? 그 이전의 상태로 롤백한다.

### useInfiniteQuery

연속적으로 요청해야하는 API(무한스크롤 등)을 위해 나온 hook

```typescript
const useGetInfiniteTalks = (agoraId: number) => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery<ITalkList>(
    ['getTalks', agoraId],
    ({ pageParam }) => getTalks({ roomId: +agoraId, cur: pageParam }),
    {
      getNextPageParam: lastPage => {
        return lastPage.hasNext ? lastPage.lastIndex : null;
      },
    },
  );
  return {
    pages: data?.pages,
    isLoading: isLoading,
    lastIndex: data?.pageParams,
    fetchNextPage,
  };
};
```

- 여기서 반환값의 data는 pages라는 배열을 갖는다.

  ```
  data.pages = [{
    hasNext: boolean,
    lastIndex: number,
    결과값: any,
  }, 
  ...,]
  ```

  pages 안에는 하나의 요청당 하나의 page가 계속해서 쌓인다.

- `getNextPageParam`는 `pageParam`의 값을 설정해줄 수 있는 콜백
  위 코드에서는 `lastPage`로 마지막으로 불러온 데이터의 `hasNext`와 `lastIndex`를 조회해서 다음 불러올 페이지가 있다면 기준이 될 `cursorId`를 `pageParams`로 넘겨주고 없다면 `null`값을 전달해준다.
- `fetchNextPage`위에서 설정한 `pageParam`을 기준으로 다음 쿼리를 실행하게 하는 함수 실행하게되면 pages에 page가 추가된다.

