import { Metadata } from 'next';

import UserInitializer from '@/components/auth/UserInitializer';
import Banner from '@/components/home/Banner';
import PlaceSection from '@/components/home/PlaceSection';
import PopularDrinkSection from '@/components/home/PopularDrinkSection';
import ThematicRecommender from '@/components/recommend/ThematicRecommender';
import { fetchPopularDrinks } from '@/utils/drink/action';
import { fetchPlaces } from '@/utils/place/action';
import { getRecommendations } from '@/utils/recommend/recommendationService';

// ISR 설정
export const revalidate = 3600;

export const metadata: Metadata = {
  title: '메인 페이지',
  description: 'AI 추천 기반 전통주를 만나보세요!',
};

const Home = async () => {
  const [recommendations, popularDrinks, places] = await Promise.all([
    getRecommendations(),
    fetchPopularDrinks(),
    fetchPlaces(),
  ]);

  return (
    <>
      <Banner />
      <ThematicRecommender recommendations={recommendations} />
      <PopularDrinkSection drinks={popularDrinks} />
      <PlaceSection places={places} />
      <UserInitializer />
    </>
  );
};

export default Home;
