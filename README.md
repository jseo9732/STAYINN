<details>
<summary>서지수</summary>

## 작업 내용
### 헤더, 푸터
  - 각 페이지에 맞게 사용할 수 있도록 컴포넌트화
### 장바구니
  - 장바구니 조회
  - 장바구니에 담긴 상품 데이터 (이미지, 상품명, 옵션 등)에 따른 상품별 구매 금액, 전체
  주문 합계 금액 등을 화면에 출력
  - 지난 체크인 날짜, 재고 없음으로 인한 예약 마감 상품 표시
  - 장바구니 개별 삭제 기능 구현
  - 장바구니 체크 박스를 통해 삭제 기능 구현
  - 예약 불가 상품 삭제 기능 구현
  - 예약 마감 상품을 제외한 전체 선택 / 해제 기능 구현
  - 체크 박스를 통해 결제할 상품을 선택/제외 기능 구현
  - 장바구니에서 주문하기 버튼 클릭 시, 예약(주문) 페이지로 이동

|     헤더    |     장바구니 개별, 선택 삭제     |
| :----------------------------------------: | :--------------------------------: |
|![헤더g](https://github.com/jseo9732/STAYINN/assets/79249376/cec64151-a5bd-438e-a4b2-a8e4415d70d2) | ![삭제g](https://github.com/jseo9732/STAYINN/assets/79249376/7a04ebe1-c2a8-44cd-abfb-2be96e261465)|

|    예약 불가 장바구니 삭제    |    전체 선택, 선택 항목 예약      |
| :--------------------------------------------------: | :-------------------------------------------------: |
|![예약 마감 삭제g](https://github.com/jseo9732/STAYINN/assets/79249376/93464135-a7fd-430e-8297-80658554bff7) | ![예약하기g](https://github.com/jseo9732/STAYINN/assets/79249376/ac235716-94b4-406d-a85e-01265677519b) |

## 💥 트러블 슈팅
- 필요한 위치에서만 푸터 표시
  NextJS 서버에서 푸터가 필요한 페이지인지 구분한 뒤에 렌더링이 되기 전에 푸터 유무를 판단하여 보여 주고 싶었는데 서버 컴포넌트의 header, cookie (from next/header)를 사용하여 정보를 받아와도 페이지를 판단할 수 있는 원하는 값을 찾을 수 없었다. 프로젝트 기한 때문에 필요한 페이지마다 푸터를 넣어주는 방식으로 임시 해결했지만 서버 컴포넌트와 클라이언트 컴포넌트의 차이에 대해서 공부할 수 있었다. 이후 리펙토링 과정에서 아쉬웠던 부분을 개선해보려고 한다.
    
- 장바구니 선택
  장바구니에 예약 불가(체크인 날짜가 지났거나 예약 가능한 방의 수가 없는 경우) 항목은 체크가 불가능하게 처리, 전체 선택, 필요한 항목만 선택 후 삭제, 개별 삭제 등 고려해야할 경우의 수가 많아 많은 어려움이 있었다.
    - Strict 모드로 인한 전체 선택 배열에 같은 아이템이 들어가 실제 선택한 수의 2배가 선택 처리되는 이슈
    - 첫 렌더링 시 전체 선택이 될 때 각 checkbox의 onChange가 개별적으로 인식되지 않아 각 항목이 체크가 되었을 때 그에 따른 배열 값을 바꿔줘야하는 이슈
- 이 외에도 많은 이슈가 있었지만 `useEffect`와 `useState` 를 잘 고려하여 해결하면서 다시 리액트의 라이프 사이클을 공부할 수 있었다.

## 회고
이전 토이2 프로젝트에서 익숙했던 페이지 라우터를 사용했었는데 이번 프로젝트에서 app 라우터를 사용하면서 app 라우터 개발 경험을 할 수 있었고 이전에는 고민하지 않았던 서버 컴포넌트와 클라이언트 컴포넌트에서 대해서 공부할 수 있었습니다.   
백엔드와의 협업을 통해서 많은 개발이 진행되기 전에 빠르게 데이터 형식이나 api 문서를 통일한 뒤에 작업해야지 큰 문제 발생하지 않고 문제 해결도 수월하게 할 수 있다는 것을 알게 되었고 문서화와 소통의 중요성을 알게 되었습니다.   
장바구니 기능 구현을 담당하면서 디테일한 작업들이 많아서 상태관리나 라이프 사이클을 공부할 수 있는 좋은 경험이 되었습니다. 코드의 가독성을 위해서 컴포넌트의 분리 및 컨벤션을 따르려고 노력했습니다. 팀원들과 대면으로 소통하여 원할하게 프로젝트를 마무리 할 수 있었습니다!

</details>

<details>
<summary>서지수</summary>

1. 장바구니 목록 삭제 확인 절차없이 바로 삭제되는 문제
   * 상황
     장바구니 목록을 조회하는 페이지에서 '예약불가삭제', '선택삭제', '개별삭제' 버튼을 클릭하면 한번 더 확인하는 절차없이 바로 삭제되는 상황
   * 문제
     장바구니에 추가한 항목이 확인 절차없이 바로 삭제된다면 사용자 경험이 떨어지는 것으로 판단
   * 해결
     삭제를 확인하는 모달을 만들어서 바로 삭제되어 사용자 경험을 개선
   * 코드
     ```js
     'use client';

      import { useEffect } from 'react';
      
      interface Props {
        title?: string;
        content?: string;
        cancel?: string;
        onCancelClick: VoidFunction;
        confirm?: string;
        onConfirmClick: VoidFunction;
      }
      
      const Modal = ({
        title = '삭제하시겠어요?',
        content,
        cancel = '아니요',
        onCancelClick,
        confirm = '삭제하기',
        onConfirmClick,
      }: Props) => {
        useEffect(() => {
          document.body.style.overflow = 'hidden';
          return () => {
            document.body.style.overflow = 'unset';
          };
        }, []);
      
        return (
          <div className='fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]'>
            <div className='w-[18.5rem] rounded-2xl bg-white px-4 pb-2 pt-8'>
              <div className='mx-1 mb-4 text-center text-base font-bold text-black'>
                {title}
              </div>
              <div className='text-gray1 mx-1 mb-5 text-center text-sm'>
                {content}
              </div>
              <div className='flex items-center justify-center text-base'>
                <button
                  className='text-gray1 mx-1 h-10 w-full flex-1'
                  onClick={onCancelClick}
                >
                  {cancel}
                </button>
                <button
                  className='text-blue mx-1 h-10 flex-1 font-bold'
                  onClick={onConfirmClick}
                >
                  {confirm}
                </button>
              </div>
            </div>
          </div>
        );
      };
      
      export default Modal;
     ```
     ```js
     const DeleteButton = ({ cartId }: Props) => {
     const [isShowModal, setIsShowModal] = useState(false);
    
     return (
         <>
           <button
             type='button'
             aria-label='장바구니 삭제'
             onClick={() => setIsShowModal(true)}
           >
             <HiMiniXMark className='text-gray1' />
           </button>
           {isShowModal && (
             <Modal
               content='선택하신 상품이 삭제됩니다'
               onCancelClick={() => setIsShowModal(false)}
               onConfirmClick={deleteCartItem}
             />
           )}
          {isShowToast && <Toast message={isShowToast} />}
        </>
       );
     };
      
     export default DeleteButton;
     ```
     삭제 버튼을 클릭하면 모달을 표시해주고 항목을 삭제할지 한번 더 확인하는 절차를 거치도록 개선
   
2. api로 받아온 데이터를 사용하는 코드에 맞도록 전처리하는 코드가 길어 파일에 너무 많은 코드를 보유하고 있는 문제
   * 상황
     api로 받아온 장바구니 데이터가 화면에 보여줘야하는 형식과 차이가 있어 전처리를 해주어야하는데 그 코드가 너무 길어 한 파일에 너무 많은 내용을 가지고 있는 상황
   * 문제
     한 파일에 너무 많은 코드를 가지고 있어서 코드 가독성이 떨어지고 유지보수가 쉽지 않은 문제
   * 해결
     데이터를 전처리하는 코드를 커스텀훅으로 분리
   * 코드
     ```js
      import { useEffect, useState } from 'react';
      
      import type { CartItemInfo, PreppedCartProduct } from '@/@types/cart.types';
      
      const useCartList = (apiCartList: CartItemInfo[]) => {
        const [preppedProductList, setPreppedProductList] = useState<
          PreppedCartProduct[]
        >([]);
      
        useEffect(() => {
          setPreppedProductList([]);
      
          apiCartList.map((item) => {
            setPreppedProductList((prevPreppedProductList) => {
              const existingIndex = prevPreppedProductList.findIndex(
                (prevPreppedProductItem) =>
                  prevPreppedProductItem.productId === item.product.productId
              );
      
              // 배열 안에 숙소가 존재하면
              if (existingIndex !== -1) {
                return prevPreppedProductList.map((prevPreppedProductItem, index) => {
                  // 숙소 안에 방만 추가
                  if (index === existingIndex) {
                    return {
                      ...prevPreppedProductItem,
                      cartRoomList: [
                        ...prevPreppedProductItem.cartRoomList,
                        {
                          id: item.id,
                          roomId: item.product.roomId,
                          imageUrl: item.product.imageUrl,
                          roomName: item.product.roomName,
                          baseGuestCount: item.product.baseGuestCount,
                          maxGuestCount: item.product.maxGuestCount,
                          price: item.product.price,
                          checkInTime: item.product.checkInTime,
                          checkOutTime: item.product.checkOutTime,
                          stock: item.product.stock,
                          checkInDate: item.checkInDate,
                          checkOutDate: item.checkOutDate,
                          numberOfNights: item.numberOfNights,
                          guestCount: item.product.guestCount,
                        },
                      ],
                    };
                  }
                  return prevPreppedProductItem;
                });
              }
      
              // 존재하지 않으면 숙소 및 방 추가
              return [
                ...prevPreppedProductList,
                {
                  productId: item.product.productId,
                  productName: item.product.productName,
                  address: item.product.address,
                  cartRoomList: [
                    {
                      id: item.id,
                      roomId: item.product.roomId,
                      imageUrl: item.product.imageUrl,
                      roomName: item.product.roomName,
                      baseGuestCount: item.product.baseGuestCount,
                      maxGuestCount: item.product.maxGuestCount,
                      price: item.product.price,
                      checkInTime: item.product.checkInTime,
                      checkOutTime: item.product.checkOutTime,
                      stock: item.product.stock,
                      checkInDate: item.checkInDate,
                      checkOutDate: item.checkOutDate,
                      numberOfNights: item.numberOfNights,
                      guestCount: item.product.guestCount,
                    },
                  ],
                },
              ];
            });
          });
        }, [apiCartList]);
      
        return preppedProductList;
      };
      
      export default useCartList;
     ```

</details>
