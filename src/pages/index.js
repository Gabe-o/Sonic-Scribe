import * as React from "react";
import NavigationBar from "../components/NavigationBar"
import BG from "../images/headphone-bg.png"

const IndexPage = () => {
    return (
        <>
            <div className="relative h-screen">
                <img src={BG} className="absolute inset-0 object-cover w-full h-full z-0" />
                <div className="absolute inset-0 z-10">
                    <NavigationBar />
                </div>
            </div>
        </>

    );
};

export default IndexPage;

export const Head = () => <title>SonicScribe</title>;
