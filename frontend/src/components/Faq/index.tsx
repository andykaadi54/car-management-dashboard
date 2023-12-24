import React from "react";

const Faq: React.FC = () => {
	return (
		<section id="faq" className="faq" data-testid="faq">
			<div className="container">
				<div className="row">
					<div className="col-lg-5 col-md-12 faq-desc">
						<h1>Frequently Asked Question</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
					</div>

					<div className="col-lg-7 col-md-12">
						<div
							className="accordion accordion-flush"
							id="accordionFlushExample"
							data-testid="flush-collapseOne"
						>
							<div className="accordion-item border">
								<h2 className="accordion-header">
									<button
										className="accordion-button collapsed"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#flush-collapseOne"
										aria-expanded="false"
										aria-controls="flush-collapseOne"
									>
                    Apa saja syarat yang dibutuhkan?
									</button>
								</h2>
								<div
									id="flush-collapseOne"
									className="accordion-collapse collapse"
									data-bs-parent="#accordionFlushExample"
								>
									<div className="accordion-body">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis, laudantium!
									</div>
								</div>
							</div>
							<div className="accordion-item border">
								<h2 className="accordion-header">
									<button
										className="accordion-button collapsed"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#flush-collapseTwo"
										aria-expanded="false"
										aria-controls="flush-collapseTwo"
									>
                    Berapa hari minimal sewa mobil lepas kunci?
									</button>
								</h2>
								<div
									id="flush-collapseTwo"
									className="accordion-collapse collapse"
									data-bs-parent="#accordionFlushExample"
								>
									<div className="accordion-body">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis, laudantium!
									</div>
								</div>
							</div>
							<div className="accordion-item border">
								<h2 className="accordion-header">
									<button
										className="accordion-button collapsed"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#flush-collapseThree"
										aria-expanded="false"
										aria-controls="flush-collapseThree"
									>
                    Berapa hari sebelumnya sabaiknya booking sewa mobil?
									</button>
								</h2>
								<div
									id="flush-collapseThree"
									className="accordion-collapse collapse"
									data-bs-parent="#accordionFlushExample"
								>
									<div className="accordion-body">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis, laudantium!
									</div>
								</div>
							</div>
							<div className="accordion-item border">
								<h2 className="accordion-header">
									<button
										className="accordion-button collapsed"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#flush-collapseFour"
										aria-expanded="false"
										aria-controls="flush-collapseThree"
									>
                    Apakah Ada biaya antar-jemput?
									</button>
								</h2>
								<div
									id="flush-collapseFour"
									className="accordion-collapse collapse"
									data-bs-parent="#accordionFlushExample"
								>
									<div className="accordion-body">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis, laudantium!
									</div>
								</div>
							</div>
							<div className="accordion-item border">
								<h2 className="accordion-header">
									<button
										className="accordion-button collapsed"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#flush-collapseFive"
										aria-expanded="false"
										aria-controls="flush-collapseThree"
									>
                    Bagaimana jika terjadi kecelakaan
									</button>
								</h2>
								<div
									id="flush-collapseFive"
									className="accordion-collapse collapse"
									data-bs-parent="#accordionFlushExample"
								>
									<div className="accordion-body">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis, laudantium!
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Faq;
