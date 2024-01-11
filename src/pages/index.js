import * as React from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";

const styles = {
	header: {
		fontFamily: "Brush Script MT, cursive",
		color: "white",
		fontSize: "72px",
	},

	p: {
		fontFamily: "Arial, sans-serif",
		color: "white",
		fontSize: "16px",
	},
};

const IndexPage = () => {
	return (
		<div>
			<NavigationBar />

			<Container>
				<div class="info">
					<div>
						<header style={styles.para}>Welcome to Sonic Scribe</header>
					</div>

					<body>
						<div>
							<p style={styles.p}>
								Experience the seamless transformation of your favorite tunes into written notes with our innovative audio-to-sheet music converter.
							</p>
							<p style={styles.p}>Our platform allows you to effortlessly convert audio tracks, melodies, or compositions into accurate and readable sheet music.</p>
							<p style={styles.p}>
								Simply upload your audio file, and watch as our advanced technology transcribes the music into sheet notation, providing musicians and composers
								with a new way to capture, preserve, and explore melodies.
							</p>
						</div>
					</body>
				</div>
			</Container>
		</div>
	);
};

export default IndexPage;

export const Head = () => <title>SonicScribe</title>;
