import React, { useState, useEffect } from "react";

interface Car {
  id: number;
  image: string;
  model: string;
  manufacture: string;
  rentPerDay: number;
  description: string;
  capacity: number;
  transmission: string;
  year: string;
  availableAt: Date;
}

const FilterSearch: React.FC = () => {
	const [cars, setCars] = useState<Car[]>([]);
	const [displayCars, setDisplayCars] = useState<Car[]>([]);
	const [driverType, setDriverType] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [time, setTime] = useState<string>("");
	const [capacity, setCapacity] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await window.fetch(
					"https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const contentType = response.headers.get("content-type");
				if (contentType && contentType.indexOf("application/json") !== -1) {
					const data: Car[] = await response.json();
					setCars(data);
				} else {
					throw new Error("Invalid content type. Expected JSON.");
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const getRandomInt = (min: number, max: number): number => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const populateCars = (cars: Car[]): Car[] => {
		return cars.map((car) => {
			const isPositive = getRandomInt(0, 1) === 1;
			const timeAt = new Date();
			const mutator = getRandomInt(1000000, 100000000);
			const availableAt = new Date(
				timeAt.getTime() + (isPositive ? mutator : -1 * mutator)
			);

			return {
				...car,
				availableAt,
			};
		});
	};

	const handleSearchCar = () => {
		const carsPopulate = populateCars(cars);
		console.log("Cars Populated:", carsPopulate);
		const today = new Date();
		const newDateTime = new Date(`${date} ${time}`);

		if (driverType === "") {
			alert("Please select driver type");
			return;
		} else if (!date) {
			alert("Please select date");
			return;
		} else if (newDateTime < today) {
			alert("Don't select past time");
			return;
		}

		const filterCars = carsPopulate.filter((item) => {
			const carAvailableAt = new Date(item.availableAt);
			return item.capacity >= Number(capacity) && carAvailableAt >= newDateTime;
		});

		setDisplayCars(filterCars);
		console.log("Filtered Cars:", filterCars);
	};

	const handleReset = () => {
		setDisplayCars([]);
		setDriverType("");
		setDate("");
		setTime("");
		setCapacity("");
	};

	return (
		<div className="container" data-testid="filter-search">
			<div className="row">
				<div className="col-10 offset-1 search-car">
					<div className="row">
						{/* Driver */}
						<div className="col-lg">
							<div>
								<label htmlFor="driver">Tipe Driver</label>
								<select
									className="form-control"
									id="driver"
									onChange={(e) => setDriverType(e.target.value)}
								>
									<option value="" hidden>
                    Pilih Tipe Driver
									</option>
									<option value="1">Dengan Sopir</option>
									<option value="2">Tanpa Sopir (Lepas Kunci)</option>
								</select>
							</div>
						</div>

						{/* Tanggal */}
						<div className="col-lg">
							<div>
								<label htmlFor="date">Tanggal</label>
								<input
									type="date"
									value={date}
									className="form-control"
									placeholder="Pilih Tanggal"
									id="date"
									onChange={(e) => setDate(e.target.value)}
								/>
							</div>
						</div>

						{/* Waktu Jemput */}
						<div className="col-lg">
							<div>
								<label htmlFor="time">Waktu Jemput/Ambil</label>
								<input
									type="time"
									value={time}
									className="form-control"
									placeholder="Pilih Waktu"
									id="time"
									onChange={(e) => setTime(e.target.value)}
								/>
							</div>
						</div>

						{/* Jumlah Penumpang */}
						<div className="col-lg">
							<div>
								<label htmlFor="passenger">Jumlah Penumpang (optional)</label>
								<input
									type="number"
									value={capacity}
									className="form-control"
									placeholder="Jumlah Penumpang"
									id="passenger"
									onChange={(e) => setCapacity(e.target.value)}
								/>
							</div>
						</div>

						<div className="col-lg d-flex align-items-center">
							<div className="span2">
								<button
									className="btn btn-success m-2"
									id="load-btn"
									onClick={handleSearchCar}
								>
                  Cari Mobil
								</button>
								<button
									className="btn btn-danger btn-block"
									id="clear-btn"
									onClick={handleReset}
								>
                  Clear
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="row mt-5" id="carContainerList">
					{displayCars.length > 0 ? (
						displayCars.map((item) => (
							<div
								className="col-lg-4 mt-2 d-flex align-items-stretch"
								key={item.id}
							>
								<div className="card p-4">
									<img src={item.image} alt="car" className="m-3 rounded" />
									<p className="mt-auto">
										{item.model}/{item.manufacture}
									</p>
									<p className="fw-bold fs-6">Rp{item.rentPerDay}</p>
									<p>{item.description}</p>
									<p>
										<i className="bi bi-person"></i>
										{item.capacity} Orang
									</p>
									<p>
										<i className="bi bi-gear"></i>
										{item.transmission}
									</p>
									<p>
										<i className="bi bi-calendar"></i>
										{item.year}
									</p>
									<button className="btn btn-success">Pilih Mobil</button>
								</div>
							</div>
						))
					) : (
						<div className="text-center">
							<h1>Data Mobil Kosong</h1>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FilterSearch;
