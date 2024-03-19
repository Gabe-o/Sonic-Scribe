import React from "react";
import TranscriptionResults from "../components/TranscriptionResults/TranscriptionResults";


const transcribe = ({ location }) => {
   
	return (
		<div>
			<TranscriptionResults noteSequence={location.state.noteSequence} />
		</div>
	);
};

export default transcribe;

export const Head = () => <title>SonicScribe</title>;
