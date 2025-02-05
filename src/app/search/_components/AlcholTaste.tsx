import OptimizedImage from '@/components/common/OptimizedImage';
import useFilterStore from '@/store/filterStore';
import { TasteRadioButtonProps } from '@/types/search';

const AlcholeTaste = ({ category }: TasteRadioButtonProps) => {
  const { tastePreferences, setTastePreferences, removeTastePreference } =
    useFilterStore();

  const levels = [
    // 텍스트와 숫자 매핑
    { label: '매우 약함', value: 1 },
    { label: '약함', value: 2 },
    { label: '보통', value: 3 },
    { label: '강함', value: 4 },
    { label: '매우 강함', value: 5 },
  ];

  const categoryMapping: Record<string, string> = {
    단맛: 'sweetness',
    신맛: 'acidity',
    청량감: 'carbonation',
    바디감: 'body',
  };
  console.log(tastePreferences);
  const handleCategoryClick = (value: number) => {
    const mappedCategory = categoryMapping[category] || category; // 한글 영문으로 변환하기

    if (tastePreferences[mappedCategory] === value) {
      removeTastePreference(mappedCategory); // 초기화
    } else {
      setTastePreferences(mappedCategory, value); // 선택된 값 저장
    }
  };

  const selectedValue = tastePreferences[categoryMapping[category]] || null;


  return (
    <div className="mt-10 h-[100px]">
      <h3 className="mb-[16px] text-title-mb font-bold leading-[135%] text-grayscale-900">
        {category}으로 찾기
      </h3>
      <div className="flex items-center justify-between">
        {levels.map(({ label, value }, index) => (
          <div
            key={value}
            onClick={() => handleCategoryClick(value)}
            className={`flex cursor-pointer flex-col items-center ${
              index === levels.length - 1 ? 'items-end' : ''
            }`}
          >
            <div
              className={`flex h-10 w-10 cursor-pointer items-center justify-center`}
            >
              {selectedValue === value ? (
                // 클릭된 상태의 SVG
                <OptimizedImage
                  src="/assets/icons/Radio-Button-clicked.svg"
                  alt="선택 아이콘"
                />
              ) : (
                // 기본 상태의 SVG
                <OptimizedImage
                  src="/assets/icons/Radio-Button.svg"
                  alt="선택해제 아이콘"
                />
              )}
            </div>
            <span className="color-grayscale-900 mt-1 text-caption-mm font-medium leading-[150%]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlcholeTaste;
