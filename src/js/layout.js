import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./views/home";
import { Single } from "./views/single";
import injectContext from "./store/appContext";
import Contacts from "./views/Contacts";
import AddContacts from "./views/AddContacts";

import ScrollToTop from "./component/scrollToTop";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import NotFound from "./views/NotFound";

const Layout = () => {
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/single/:theid" element={<Single />} />
						<Route path="/contacts" element={<Contacts />} />					
						<Route path="/add-contacts" element={<AddContacts />} />
						<Route path="/edit-contact/:id" element={<AddContacts />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
