import React from "react";

const OurService: React.FC = () => {
	return (
		<section id="our-service" className="our-service">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 col-md-12">
						<div className="our-service-img">
							<img
								src="https://i.ibb.co/R9DrM9T/img-service.png"
								alt="img-service"
							/>
						</div>
					</div>
					<div className="col-lg-6 col-md-12">
						<div className="service-desc">
							<h1>Best Car Rental for any kind of trip in (Lokasimu)!</h1>
							<p>
                Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga
                lebih murah dibandingkan yang lain, kondisi mobil baru, serta
                kualitas pelayanan terbaik untuk perjalanan wisata, bisnis,
                wedding, meeting, dll.
							</p>
							<ul>
								<li>
									<img src="https://i.ibb.co/WPHHMt0/ceklis.png" alt="ceklis" />
                  Sewa Mobil Dengan Supir di Bali 12 Jam
								</li>
								<li>
									<img src="https://i.ibb.co/WPHHMt0/ceklis.png" alt="ceklis" />
                  Sewa Mobil Lepas Kunci di Bali 24 Jam
								</li>
								<li>
									<img src="https://i.ibb.co/WPHHMt0/ceklis.png" alt="ceklis" />
                  Sewa Mobil Jangka Panjang Bulanan
								</li>
								<li>
									<img src="https://i.ibb.co/WPHHMt0/ceklis.png" alt="ceklis" />
                  Gratis Antar - Jemput Mobil di Bandara
								</li>
								<li>
									<img src="https://i.ibb.co/WPHHMt0/ceklis.png" alt="ceklis" />
                  Layanan Airport Transfer / Drop In Out
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default OurService;
