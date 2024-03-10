import * as React from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import BG from "../images/headphone-bg.png";

import { Container } from "react-bootstrap";

const styles = {
	background: {
		backgroundImage: `url(${BG})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		width: "100vw",
		height: "100vh",
	},
	container: {
		fontFamily: "Arial, sans-serif",
		lineHeight: "4",
		padding: "20px",
		maxWidth: "800px",
		margin: "0 auto",
	},
	header: {
		fontFamily: "Brush Script MT, cursive",
		color: "white",
		fontSize: "80px",
		headerTitleAlign: "left",
	},

	p1: {
		fontFamily: "Arial, sans-serif",
		color: "white",
		fontSize: "20px",
		margin: "10px",
	},
	p2: {
		fontFamily: "Arial, sans-serif",
		color: "white",
		fontSize: "16px",
		margin: "10px",
	},
};

const IndexPage = () => {
	return (
		<div>
			<div className="cComponent" style={styles.background}>
			<NavigationBar />
			
			<Container>
				<div class="info">
					<div style={styles.container}>
						<header style={styles.header}>Welcome to Sonic Scribe</header>

						<body>
							<div className="position-absolute top-80 start-0 translate middle">
								<p style={styles.p1}>
									Experience the seamless transformation of your favorite tunes into written notes with our innovative audio-to-sheet music converter.
								</p>
								<p style={styles.p1}>
									Our platform allows you to effortlessly convert audio tracks, melodies, or compositions into accurate and readable sheet music.
								</p>
								<p style={styles.p2}>
									Simply upload your audio file, and watch as our advanced technology transcribes the music into sheet notation, providing musicians and
									composers with a new way to capture, preserve, and explore melodies.
								</p>
							</div>
						</body>
					</div>
				</div>
			</Container>
			</div>
		</div>
	);
};

export default IndexPage;

export const Head = () => <title>SonicScribe</title>;
