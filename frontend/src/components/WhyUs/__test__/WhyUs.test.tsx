import { render } from "@testing-library/react";
import "@testing-library/jest-dom/"; 
import WhyUs from "..";

test("renders why us content correctly", () => {
	const { getByText, getByAltText } = render(<WhyUs />);

	expect(getByText("Why Us?")).toBeInTheDocument();

	expect(getByText("Mengapa harus pilih Binar Car Rental?")).toBeInTheDocument();

	const icons = [
		"icon-complete",
		"icon-price",
		"icon-24hrs",
		"icon-professional",
	];

	icons.forEach((icon) => {
		expect(getByAltText(icon)).toBeInTheDocument();
	});

	const cardTitles = ["Mobil Lengkap", "Harga Murah", "Layanan 24 Jam", "Sopir Profesional"];
	const cardTexts = [
		"Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat",
		"Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain",
		"Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu",
		"Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu",
	];

	cardTitles.forEach((title, index) => {
		expect(getByText(title)).toBeInTheDocument();
		expect(getByText(cardTexts[index])).toBeInTheDocument();
	});
});