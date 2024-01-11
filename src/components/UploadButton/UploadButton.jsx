// src/components/UploadButtonComponent.js
import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";

// styles
import "./UploadButton.css";

const UploadButtonComponent = ({ onFileUpload }) => {
    const toast = useRef(null);
    let file = undefined;
    const [selectedFile, setSelectedFile] = useState();

    // const saveFileLocally = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();

    //         reader.onload = (event) => {
    //             const result = reader.result;
    //             const blob = new Blob([result], { type: file.type });
    //             let url = URL.createObjectURL(blob);
    //             resolve(url);
    //         };

    //         reader.onerror = (event) => {
    //             reject(reader.error);
    //         };

    //         reader.readAsArrayBuffer(file);
    //     });
    // };

    async function onSelect(event) {
        // event.files == files to upload
        file = event.files[0];
        console.log(file);

        setSelectedFile(file);
    }

    const onError = (event) => {
        // event.files == files that failed to upload
        file = undefined;
    };

    const handleConvert = () => {
        if (selectedFile) {
            // Uploads file so it can be used elsewhere
            if (onFileUpload) onFileUpload(selectedFile);
            // Save file locally if you need it in a url e.x. localhost:8000/{uuid}
            // url = await saveFileLocally(file);
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Uploaded " + selectedFile.name,
                life: 2000,
                style: { color: "white" },
            });
        }
        else {
            alert("Please select a file");
        }
    }

    const uploadButtonContainerStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "40vw",
    }

    const uploadFileTextStyles = {
        width: "100%",
        height: "35px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
        marginRight: "10px"
    }

    const uploadButtonStyles = {
        width: "150px",
        height: "35px",
        backgroundColor: "#cbb593",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }

    const convertButtonStyles = {
        width: "150px",
        height: "35px",
        backgroundColor: "#1c404e",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "200",
        border: "0.5px solid white",
        marginTop: "10%",

        ":hover": {
            backgroundColor: "white",
        },
    }

    return (
        <div style={uploadButtonContainerStyles}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                marginTop: "5vh",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={uploadFileTextStyles}>
                    {selectedFile && selectedFile.name}
                </div>
                <div>
                    <Toast ref={toast} />
                    <FileUpload
                        name="files[]"
                        mode="basic"
                        onSelect={onSelect}
                        onError={onError}
                        multiple={false}
                        accept=".mp3,.wav,.mid,.midi"
                        chooseLabel="Upload File"
                        style={uploadButtonStyles}
                    />
                </div>
            </div>
            <button style={convertButtonStyles} onClick={() => handleConvert()}>
                Convert
            </button>
        </div>
    );
};

export default UploadButtonComponent;
