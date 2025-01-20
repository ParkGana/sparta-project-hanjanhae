import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import useFilterStore from '@/store/filterStore';
import useModalStore from '@/store/modalStore';

const tasteMapping: { [key: string]: string } = {
  sweetness: '단맛',
  acidity: '신맛',
  carbonation: '청량감',
  body: '바디감',
};

type FilterItem = {
  label: string; // 필터에 표시되는 텍스트
  value: string | number | [number, number]; // 값은 문자열, 숫자, 또는 배열
  original: string; // 고유 식별자
};

const FilterSideBar = () => {
  const { openModal } = useModalStore();
  const {
    selectedTypes,
    alcoholStrength,
    tastePreferences,
    removeSelectedType,
    removeAlcoholStrength,
    removeTastePreference,
    setTriggerFetch,
    setValues,
  } = useFilterStore();
  console.log(selectedTypes, alcoholStrength, tastePreferences);
  const getStrengthLabel = (
    strength: [number, number] | null | undefined,
  ): string => {
    const [min, max] = strength ?? [0, 100];

    if (min === 0 && max === 100) return '전체 도수';
    if (max <= 15) return '15도 이하';
    if (min >= 15 && max <= 30) return '15도 이상 30도 이하';
    if (min === 0 && max === 30) return '30도 이하';
    if (min === 15 && max === 100) return '15도 이상';
    if (min >= 30 && max === 100) return '30도 이상'; // 30도 이상으로 수정

    return '알 수 없음'; // 기본값 설정
  };
  // 이런 데이터들 => 상수 관리하는 파일 const.ts
  // 따로 관리를 해서 굳이 컴포넌트 내부에서 선언하지 않고 가져올 수 있다.
  // 컴포넌트 안에다가 변수를 처리하지 않는다.
  // 제 렌더링 될 때마다 새로운 변수를 계속 만들어내는 거임.
  // 이것들은 컴포넌트 밖에 있는게 맞다.
  // 안에 두고 있는 변수들은 state 가 내부에 있을 때만
  // 혹은 hook을 사용하거나 state는 매번 바뀌어야 하기 때문에 안에 있는거고,
  // 여기 있는 데이터는 변하지 않기 때문에 밖에 두는 것이 좋다.
  // 최상위 폴더나 파일 같은거 만들어서

  // tastePreferences를 한글로 변환하는 키-값 매핑

  // tastePreferences 값(숫자)을 텍스트로 변환하는 매핑
  const tasteLabels: { [key: number]: string } = {
    1: '매우 약함',
    2: '약함',
    3: '보통',
    4: '강함',
    5: '매우 강함',
  };

  // tastePreferences 객체를 순회하여 텍스트로 변환
  const tasteFilters = Object.entries(tastePreferences).map(([key, value]) => ({
    label: `${tasteMapping[key] || key}: ${tasteLabels[value] || '알 수 없음'}`,
    value,
  }));

  // 변환된 필터 데이터를 배열로 구성
  const filters: FilterItem[] = [
    ...selectedTypes.map((type) => ({
      label: type,
      value: type,
      original: type, // selectedTypes에서 영문 원문 그대로 사용
    })),
    {
      label: getStrengthLabel(alcoholStrength),
      value: [alcoholStrength[0], alcoholStrength[1]] as [number, number], // as처리 못지우는지 확인
      original: 'strength', // 도수에 대한 원문 값
    },
    ...Object.entries(tastePreferences).map(([key, value]) => ({
      label: `${tasteMapping[key] || key}: ${tasteLabels[value] || '알 수 없음'}`,
      value: value,
      original: key, // tastePreferences의 key를 original로 사용
    })),
  ]
    .filter((item) => item.label !== undefined)
    .filter(
      (item) => item.label !== '알 수 없음' && item.label !== '전체 도수',
    );
  const handleRemoveType = (original: string) => {
    removeSelectedType(original); // selectedTypes에서 해당 타입을 삭제
    setTriggerFetch(true);
  };

  const handleRemoveStrength = () => {
    setValues([1, 3]);
    removeAlcoholStrength(); // alcoholStrength를 초기화
    setTriggerFetch(true);
  };

  const handleRemoveTastePreference = (value: string) => {
    removeTastePreference(value); // tastePreferences에서 해당 맛 항목을 삭제
    setTriggerFetch(true);
  };

  return (
    <div className="mt-[16px] flex items-center justify-between gap-2 rounded-lg">
      {/* 각 필터 버튼 */}
      <div className="w-fit overflow-hidden">
        {/* Swiper 컨테이너 영역 */}
        <Swiper
          spaceBetween={10} // 슬라이드 간 간격
          slidesPerView="auto"
          loop={false} // 처음과 끝에서 반복되지 않도록 설정
          observer={true} // DOM 변화 감지
          observeParents={true} // 부모 크기 변화 감지
          wrapperClass="w-fit flex" // swiper-wrapper class명 추가
          onInit={(swiper) => swiper.update()}
          onResize={(swiper) => swiper.update()}
        >
          {filters.map((filter, index) => (
            <SwiperSlide key={index} className="flex-none shrink-0">
              <div className="flex w-fit items-center gap-1 rounded-full border border-gray-500 bg-white px-3 py-1 py-2 text-sm text-gray-700">
                <span>{filter.label}</span>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={`${filter.label} 삭제`}
                  onClick={() => {
                    if (
                      Array.isArray(filter.value) && // filter.value가 배열인지 확인
                      Array.isArray(alcoholStrength) && // alcoholStrength도 배열인지 확인
                      filter.value.length === alcoholStrength.length && // 길이 비교
                      filter.value.every(
                        (val, index) => val === alcoholStrength[index],
                      ) // 모든 요소 비교
                    ) {
                      handleRemoveStrength();
                    } else if (filter.original in tastePreferences) {
                      handleRemoveTastePreference(filter.original); // 맛 필터 삭제
                    } else {
                      handleRemoveType(filter.original); // 술 타입 필터 삭제
                    }
                  }}
                >
                  <Image
                    src="/assets/icons/cancelGray.svg"
                    alt="Cancel_button"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                  />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 설정 아이콘 */}
      <div className="w-[full]">
        <button
          className="inline-block flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 focus:outline-none"
          aria-label="필터 설정"
          onClick={openModal}
        >
          <Image
            src="/assets/icons/sliders-v-alt-white.svg"
            alt="Slider_button"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default FilterSideBar;
