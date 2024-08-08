import React from 'react';
import { MetaData } from './metadataTypes';
import Image from 'next/image';
import './ImageDetails.css';
import generatedNft from './generated';

interface ImageDetailsProps {
    selectedImage: number;
    mapSelectedImage: number;
}
const ImageDetails: React.FC<ImageDetailsProps> = ({ mapSelectedImage, selectedImage }) => {
    return (
        <div className="image-metadata-container">
            <div className="metadata-grid-column">
                <div className="selected-image-value">
                    {selectedImage}
                </div>
                <div className="image-wrapper">
                    <Image
                        src={mapSelectedImage == -1 ? "/loading.gif" : generatedNft[mapSelectedImage]}
                        id="selectedImage"
                        alt={"" + mapSelectedImage}
                        width={400}
                        height={400}
                        className="border-8 border-black rounded image-in-details"
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageDetails;