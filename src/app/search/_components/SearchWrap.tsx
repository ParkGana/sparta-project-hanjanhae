'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useSearchStore from '@/store/keywordStore';
import useModalStore from '@/store/modalStore';

import FilterModal from './FilterModal';
import FilterSearchResults from './FilterSearchResults';
import FocusInput from './FocusInput';
import SearchLogo from './SearchLogo';
import StandByScreen from './StandByScreen';

const SearchWrap = () => {
  const { searchTriggerFetch, setKeyword, setSearchTriggerFetch } =
    useSearchStore();
  const {
    triggerFetch,
    resetFilters,
    setIsFiltered,
    setTriggerFetch,
    isFiltered,
  } = useFilterStore();
  const searchParams = useSearchParams();
  const shouldShowResults = searchParams.toString() !== '';
  const shouldHideFilterSidebar = searchParams.get('keyword') !== null;
  const [searchValue, setSearchValue] = useState('');
  const { isSearchFocus, setIsSearchFocuse } = useFocusStore();
  const { isModalOpen } = useModalStore();

  console.log(isFiltered);
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/search') {
        setIsFiltered(false);
      }
    };

    // popstate 이벤트 리스너 등록
    window.addEventListener('popstate', handlePopState);

    // cleanup: 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      {!shouldShowResults && <SearchLogo />}
      <div className="html-overflow-hidden mx-auto flex w-full flex-col items-center overflow-hidden px-5 xl:px-0">
        {/* Search Bar */}
        <FocusInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          shouldShowResults={shouldShowResults}
          shouldHideFilterSidebar={shouldHideFilterSidebar}
        />
        {shouldShowResults && <FilterSearchResults />}
        {!shouldShowResults && <StandByScreen className="block xl:hidden" />}
        {!shouldShowResults && <StandByScreen className="hidden xl:flex" />}
        {isModalOpen && <FilterModal />}
      </div>
    </>
  );
};

export default SearchWrap;
