import { useEffect, useState } from "react";
import scss from "./Slider2.module.scss";
import { useKeenSlider } from "keen-slider/react";
import axios from "axios";
import { createPortal } from "react-dom";
import { Modalka } from "../modalka";

const url =
	"https://api.elchocrud.pro/api/v1/13ead5e5338c2993ddba7484df7a8082/data";
const Slider2 = () => {
	const [sliderRef] = useKeenSlider({
		breakpoints: {
			"(min-width: 400px)": {
				slides: { perView: 1, spacing: 10 },
			},
			"(min-width: 1000px)": {
				slides: { perView: 2, spacing: 10 },
			},
			"(min-width: 700px)": {
				slides: { perView: 3, spacing: 10 },
			},
		},
		slides: { perView: 1 },
	});

	const [state, setState] = useState([]);

	useEffect(() => {
		const getRequest = async () => {
			try {
				const response = await axios.get(url);
				setState(response.data);
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
		const filtred = state.find((item) => item._id === id);
		setRender([filtred]);
		serModal(true);
	}
	function closeModal(id) {
		const filtred = state.filter((item) => item._id === id);
		setRender([filtred]);
		serModal(false);
	}

	if (state.length === 0) {
		return null;
	}

	return (
		<section className={scss.slider}>
			<div className="container">
				<div className={scss.content}>
					<div ref={sliderRef} className="keen-slider">
						{state.map((item, index) => (
							<div key={index} className="keen-slider__slide number-slide1">
								<div className={scss.dev}>
									<button
										className={scss.button}
										onClick={() => modalYess(item._id)}>
										Open
									</button>
									<h3 className={scss.text}>{item.name}</h3>
									<img className={scss.png} src={item.img} alt={item.name} />
									<hr />
									<p className={scss.item}>{item.price}</p>
								</div>
							</div>
						))}

						{modal &&
							createPortal(
								<Modalka>
									{render.map((item) => (
										<div className={scss.map} key={item.id}>
											<div className={scss.map}>
												<div className={scss.logo}>
													<h1>{item.name}</h1>
													<img
														className={scss.image}
														src={item.img}
														alt="logo"
													/>
													<h1></h1>
													<h1>{item.price}</h1>
													<button
														className={scss.rel}
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

export default Slider2;
