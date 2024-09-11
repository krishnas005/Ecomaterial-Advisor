import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import InsightsSection from '../components/InsightsSection';
// import CommunitySection from '../components/CommunitySection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tata Sustainability Platform</title>
        <meta name="description" content="Explore our industry-specific recommendations, insights, and join our community for a sustainable future." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header />
        <HeroSection />
        <InsightsSection />
        {/* <CommunitySection /> */}
    </>
  );
}
