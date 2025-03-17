import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout.js";
import ChatPage from "./pages/chat/ChatPage.js";
import AlbumPage from "./pages/album/AlbumPage.js";
import AdminPage from "./pages/admin/AdminPage.js";

import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage.js";
import Landing from "./pages/landing/Landing.js";
import MadeForYou from "./pages/madeforyou/MadeForYou.js";
import Trending from "./pages/trending/Trending.js";

function App() {
	return (
		<>
			<Routes>
				<Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
				/>
				<Route path='/auth-callback' element={<AuthCallbackPage />} />
				<Route path='/admin' element={<AdminPage />} />
				<Route path='/' element={<Landing />} />

				<Route element={<MainLayout />}>
					<Route path='/home' element={<HomePage />} />
					<Route path='/madeforyou' element={<MadeForYou />} />
					<Route path='/trending' element={<Trending />} />
					<Route path='/chat' element={<ChatPage />} />
					<Route path='/albums/:albumId' element={<AlbumPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
