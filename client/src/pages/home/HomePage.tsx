import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import CopyrightModal from "@/layout/components/CopyrightBanner";

const HomePage = () => {
	const {
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		isLoading,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
	} = useMusicStore();

	const { initializeQueue } = usePlayerStore();
	const [greeting, setGreeting] = useState("Good afternoon"); 

	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

	useEffect(() => {
		if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

	useEffect(() => {
		const hour = new Date().getHours();
		if (hour < 12) {
			setGreeting("Good morning");
		} else if (hour < 18) {
			setGreeting("Good afternoon");
		} else {
			setGreeting("Good evening");
		}
	}, []);

	return (
		<main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
			<CopyrightModal/>
			<Topbar />
			<ScrollArea className="h-[calc(100vh-180px)]">
				<div className="p-4 sm:p-6">
					<h1 className="text-2xl sm:text-3xl font-bold mb-6">{greeting}</h1>
					<FeaturedSection />

					<div className="space-y-8">
						<SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} showAllLink="/madeforyou"/>
						<SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} showAllLink="/trending"/>
					</div>
				</div>
			</ScrollArea>
		</main>
	);
};

export default HomePage;
