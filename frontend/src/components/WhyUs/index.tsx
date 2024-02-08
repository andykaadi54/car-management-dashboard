import React from "react";

const WhyUs: React.FC = () => {
	return (
		<section id="why-us" className="why-us">
			<div className="container">
				<div className="why-us-desc">
					<h1>Why Us?</h1>
					<p>Mengapa harus pilih Binar Car Rental?</p>
				</div>
				<div className="why-us-card">
					<div className="row g-3">
						<div className="col-lg-3 col-md-6">
							<div className="why-us-card-body">
								<img
									src="https://i.ibb.co/TPxJ36G/icon-complete.png"
									alt="icon-complete"
								/>
								<h5>Mobil Lengkap</h5>
								<p>
                  Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan
                  terawat
								</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="why-us-card-body">
								<img
									src="https://i.ibb.co/bJCb9rT/icon-price.png"
									alt="icon-price"
								/>
								<h5>Harga Murah</h5>
								<p>
                  Harga murah dan bersaing, bisa bandingkan harga kami dengan
                  rental mobil lain
								</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="why-us-card-body">
								<img
									src="https://i.ibb.co/d5rpzby/icon-24hrs.png"
									alt="icon-24hrs"
								/>
								<h5>Layanan 24 Jam</h5>
								<p>
                  Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga
                  tersedia di akhir minggu
								</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="why-us-card-body">
								<img
									src="https://i.ibb.co/YLxpZ57/icon-professional.png"
									alt="icon-professional"
								/>
								<h5>Sopir Profesional</h5>
								<p>
                  Sopir yang profesional, berpengalaman, jujur, ramah dan selalu
                  tepat waktu
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default WhyUs;
