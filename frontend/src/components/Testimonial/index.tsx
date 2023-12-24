import React from "react";

const Testimonial: React.FC = () => {
	return (
		<section id="testimonial" className="testimonial">
			<div className="testimonial-desktop">
				<h1>Testimonial</h1>
				<p>Berbagai review positif dari para pelanggan kami</p>

				<div className="card-testimonial">
					<div className="card-body">
						<img src="https://i.ibb.co/yBwvjKb/img-photo.png" alt="img-photo" />

						<div className="card-text">
							<img src="https://i.ibb.co/QXdg0Sf/Rate.png" alt="Rate" />
							<p>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod”
							</p>
							<h5>John Dee 32, Bromo</h5>
						</div>
					</div>
					<div className="card-body">
						<img src="https://i.ibb.co/yBwvjKb/img-photo.png" alt="img-photo" />

						<div className="card-text">
							<img src="https://i.ibb.co/QXdg0Sf/Rate.png" alt="Rate" />
							<p>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod”
							</p>
							<h5>John Dee 32, Bromo</h5>
						</div>
					</div>
					<div className="card-body">
						<img
							src="https://i.ibb.co/1qKYtBt/img-photo-1.png"
							alt="img-photo-1"
						/>

						<div className="card-text">
							<img src="https://i.ibb.co/QXdg0Sf/Rate.png" alt="Rate" />
							<p>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod”
							</p>
							<h5>John Dee 32, Bromo</h5>
						</div>
					</div>
				</div>

				<div className="arrow-btn">
					<img
						src="https://i.ibb.co/FJPsQKZ/button-carousel.png"
						alt="button-carousel"
					/>
				</div>
			</div>

			<div className="testimonial-mobile">
				<div className="container">
					<div className="row">
						<div className="col">
							<div
								id="carouselExampleAutoplaying"
								className="carousel slide"
								data-bs-ride="carousel"
							>
								<div className="carousel-inner">
									<div className="carousel-item active">
										<div className="card-body">
											<img
												src="https://i.ibb.co/yBwvjKb/img-photo.png"
												alt="img-photo"
											/>
											<img src="https://i.ibb.co/QXdg0Sf/Rate.png" alt="Rate" />
											<div className="card-text">
												<p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod lorem ipsum dolor sit amet,
                          consectetur adipiscing elit, sed do eiusmod lorem
                          ipsum dolor sit amet, consectetur adipiscing elit, sed
                          do eiusmod
												</p>
												<h5>John Dee 32, Bromo</h5>
											</div>
										</div>
									</div>
									<div className="carousel-item">
										<div className="card-body">
											<img
												src="https://i.ibb.co/yBwvjKb/img-photo.png"
												alt="img-photo"
											/>
											<img src="https://i.ibb.co/QXdg0Sf/Rate.png" alt="Rate" />
											<div className="card-text">
												<p>
                          “Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod lorem ipsum dolor sit amet,
                          consectetur adipiscing elit, sed do eiusmod lorem
                          ipsum dolor sit amet, consectetur adipiscing elit, sed
                          do eiusmod”
												</p>
												<h5>John Dee 32, Bromo</h5>
											</div>
										</div>
									</div>
									<div className="carousel-item">
										<div className="card-body">
											<img
												src="https://i.ibb.co/1qKYtBt/img-photo-1.png"
												alt="img-photo-1"
											/>
											<img src="https://i.ibb.co/QXdg0Sf/Rate.png" alt="Rate" />
											<div className="card-text">
												<p>
                          “Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod lorem ipsum dolor sit amet,
                          consectetur adipiscing elit, sed do eiusmod lorem
                          ipsum dolor sit amet, consectetur adipiscing elit, sed
                          do eiusmod”
												</p>
												<h5>John Dee 32, Bromo</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col">
							<div className="btn-wrap">
								<button
									className="carousel-control-prev"
									type="button"
									data-bs-target="#carouselExampleAutoplaying"
									data-bs-slide="prev"
								>
									<img
										src="https://i.ibb.co/crGpfJ6/prev-button.png"
										alt="prev-button"
										aria-hidden="true"
									/>
									<span className="visually-hidden">Previous</span>
								</button>
								<button
									className="carousel-control-next"
									type="button"
									data-bs-target="#carouselExampleAutoplaying"
									data-bs-slide="next"
								>
									<img
										src="https://i.ibb.co/Zcxw4Dv/next-button.png"
										alt="next-button"
										aria-hidden="true"
									/>
									<span className="visually-hidden">Next</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Testimonial;
