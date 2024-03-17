import React from "react";
import TranscriptionResults from "../components/TranscriptionResults/TranscriptionResults";
import { navigate } from "gatsby";

const transcribe = ({ location }) => {
    const handleConvertMore = () => {
        navigate("/transcribe"); // Go back a page
    }

	return (
		<div>
			<TranscriptionResults noteSequence={location.state.noteSequence} handleConvertMore={handleConvertMore}/>
		</div>
	);
};

export default transcribe;

export const Head = () => <title>SonicScribe</title>;
