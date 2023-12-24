import { render } from "@testing-library/react";
import "@testing-library/jest-dom/"; 
import OurService from "..";

test("renders our service content correctly", () => {
	const { getByText, getByAltText, getAllByAltText } = render(<OurService />);

	expect(getByText("Best Car Rental for any kind of trip in (Lokasimu)!")).toBeInTheDocument();

	expect(getByAltText("img-service")).toBeInTheDocument();

	expect(
		getByText(
			"Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga lebih murah dibandingkan yang lain, kondisi mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis, wedding, meeting, dll."
		)
	).toBeInTheDocument();

	const checklistItems = getAllByAltText("ceklis");
	expect(checklistItems.length).toBe(5);

	const checklistItemTexts = [
		"Sewa Mobil Dengan Supir di Bali 12 Jam",
		"Sewa Mobil Lepas Kunci di Bali 24 Jam",
		"Sewa Mobil Jangka Panjang Bulanan",
		"Gratis Antar - Jemput Mobil di Bandara",
		"Layanan Airport Transfer / Drop In Out",
	];

	checklistItemTexts.forEach((text) => {
		expect(getByText(text)).toBeInTheDocument();
	});
});