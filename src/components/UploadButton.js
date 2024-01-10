// src/components/UploadButtonComponent.js
import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";

const UploadButtonComponent = ({ onFileUpload }) => {
    const toast = useRef(null);
    let file = undefined;
    const [fileUploaded, setFileUploaded] = useState(false);

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

        // Uploads file so it can be used elsewhere
        if (onFileUpload) onFileUpload(file);

        // Save file locally if you need it in a url e.x. localhost:8000/{uuid}
        // url = await saveFileLocally(file);
        toast.current.show({ severity: "success", summary: "Success", detail: "Uploaded " + file.name, life: 2000 });
        setFileUploaded(true);
    }

    const onError = (event) => {
        // event.files == files that failed to upload
        file = undefined;
    };

    const uploadButtonContainerStyles = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "30%",
    }

    const uploadFileTextStyles = {
        width: "100%",
        height: "40px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.3rem",
        marginRight: "10px"
    }

    const uploadButtonStyles = {
        width: "150px",
        height: "40px",
        backgroundColor: "#cbb593",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }

    return (
        <div style={uploadButtonContainerStyles}>
            <p style={uploadFileTextStyles}>Upload File</p>
            <div style={uploadButtonStyles}>
                <Toast ref={toast} />
                <FileUpload
                    name="files[]"
                    mode="basic"
                    onSelect={onSelect}
                    onError={onError}
                    multiple={false}
                    accept=".mp3,.wav,.mid,.midi"
                    chooseLabel="Upload"
                />
            </div>
        </div>
    );
};

export default UploadButtonComponent;
