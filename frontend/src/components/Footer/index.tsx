import React from "react";

const Footer: React.FC = () => {
	return (
		<footer id="footer" className="footer">
			<div className="container">
				<div className="row">
					<div className="col-lg-3 col-md-8 mb-2">
						<p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
						<p>binarcarrental@gmail.com</p>
						<p>081-233-334-808</p>
					</div>

					<div className="col-lg-3 col-md-4 mb-2">
						<a href="#our-service">Our Services</a>
						<a href="#why-us">Why Us</a>
						<a href="#testimonial">Testimonial</a>
						<a href="#faq">FAQ</a>
					</div>

					<div className="col-lg-4 col-md-8 mb-2">
						<p>Connect with us</p>
						<img src="https://i.ibb.co/0KZNPkK/list-item.png" alt="list-item" />
					</div>

					<div className="col-lg-2 col-md-4">
						<p>Copyright Binar 2022</p>
						<img src="https://i.ibb.co/4gw2rTn/logo.png" alt="logo" />
					</div>
				</div>
			</div>
		</footer>
	);
};
export default Footer;
