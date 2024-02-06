import React, { useState } from 'react';
import { API_ENDPOINT } from '../enviroments';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "file",
            selectedFile!,
            (selectedFile as any).name!
        );

        // Assuming 'selectedFile.name' is defined and is a string
        const fileNameWithoutExtension = ((selectedFile as any).name.split('.')[0]);

        fetch(`${API_ENDPOINT}/v2/${fileNameWithoutExtension}`, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())  // assuming the response is JSON
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload!
            </button>
        </div>
    );
};

export default ImageUpload;
