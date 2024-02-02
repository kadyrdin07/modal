import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import axios from "axios";
import scss from "./Slider1.module.scss";
import { createPortal } from "react-dom";
import { Modalka } from "../modalka";

const url1 =
	"https://api.elchocrud.pro/api/v1/e049c94ef79834b899fbfea6f9af36bb/iphone";

const Slider1 = () => {
	const [sliderRef] = useKeenSlider({
		breakpoints: {
			"(min-width: 400px)": {
				slides: { perView: 1, spacing: 10 },
			},
			"(min-width: 1000px)": {
				slides: { perView: 2, spacing: 10 },
			},
			"(min-width: 700px)": {
				slides: { perView: 2, spacing: 10 },
			},
		},
		slides: { perView: 1 },
	});

	const [value, setValue] = useState([]);

	useEffect(() => {
		const getRequest = async () => {
			try {
				const response = await axios.get(url1);
				setValue(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		getRequest();
	}, []);
	const [render, setRender] = useState([]);
	const [modal, serModal] = useState(false);
	// const [modalRes, setModalRes] =useState("")
	function modalYess(id) {
		const filtred = value.find((item) => item._id === id);
		setRender([filtred]);
		serModal(true);
	}
	function closeModal(id) {
		const filtred = value.filter((item) => item._id === id);
		setRender([filtred]);
		serModal(false);
	}

	if (value.length === 0) {
		return null;
	}

	return (
		<section>
			<div className="container">
				<div>
					<div ref={sliderRef} className="keen-slider">
						{value.map((item, index) => (
							<div key={index} className="keen-slider__slide number-slide1">
								<div className={scss.contact}>
								<button className={scss.click} onClick={() => modalYess(item._id)}>Open</button>

									<h3 className={scss.name}>{item.name}</h3>
									<img className={scss.img} src={item.img} alt={item.name} />
									<div>
										<p className={scss.age}>{item.age}</p>
									</div>
								</div>
							</div>
						))}
						{modal &&
							createPortal(
								<Modalka>
									{render.map((item) => (
										<div className={scss.map} key={item.id}>
											<div className={scss.filter}>
												<div className={scss.job}>
													<h1>{item.name}</h1>
													<img
														className={scss.kartin}
														src={item.img}
														alt="logo"
													/>
													<h1></h1>
													<h1 >{item.price}</h1>
													<button
														className={scss.rilly}
														onClick={() => closeModal(false)}>
														cancel
													</button>{" "}
												</div>
											</div>
										</div>
									))}
								</Modalka>,
								document.getElementById("modal")
							)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Slider1;
