import React from 'react';
import { MetaData } from './metadataTypes';
import Image from 'next/image';
import './ImageDetails.css';
import generatedNft from './generated';

interface ImageDetailsProps {
    selectedMeta: MetaData;
    selectedImage: number;
}

const getRankingImage = (rarity: number) => {
    if (rarity === 1) return "/ranking_5.png";
    if (rarity >= 2 && rarity <= 50) return "/ranking_4.5.png";
    if (rarity >= 51 && rarity <= 100) return "/ranking_4.png";
    if (rarity >= 101 && rarity <= 150) return "/ranking_3.png";
    if (rarity >= 151 && rarity <= 200) return "/ranking_2.png";
    else return "/ranking_1.png";
}

const PlaceholderMetadataItem: React.FC = () => (
    <li className="trait-item" style={{ visibility: 'hidden' }}>
        <div className="trait-icon-name">
            <img src="/1_triangle_aeons.png" alt="icon" className="trait-icon"/>
            <div className="trait-name">
                <strong>Placeholder</strong>
            </div>
        </div>
        <div className="trait-value ml-6">
            Placeholder
        </div>
    </li>
);

const ImageDetails: React.FC<ImageDetailsProps> = ({ selectedMeta, selectedImage }) => {
    const imageUrl = selectedImage || '';
    const n = (selectedImage ? selectedImage : 0)
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;
    
    const placeholdersNeeded = isDesktop ? 4 - Math.min(selectedMeta.meta.attributes.length, 4) : 0;
    
    return (

        <div className="image-metadata-container">
            <div className="metadata-grid-column">
                <div>
                    <Image
                        src={generatedNft[Number(n)]}
                        alt={selectedMeta.meta.name}
                        width={400}
                        height={400}
                        className="border-8 border-black rounded image-in-details"
                    />
                    <div className="details-modal-header">
                        <h2 className="pl-1">AEON {selectedMeta.meta.name}</h2>
                        <div className="rarity invisible-element">
                            <h2 className="pr-1">RARITY {selectedMeta.rarity}</h2>
                                <Image
                                    src={getRankingImage(selectedMeta.rarity)}
                                    alt="ranking"
                                    width={80}
                                    height={80}
                                    className="pr-1 pb-1 rarity-image"
                                />
                            </div>
                    </div>
                </div>
            </div>

            <div className="">
                <div className="metadata-grid-column">
                    <div>
                        <h2 className="attributes-header">ATTRIBUTES</h2>
                        <div className="metadata-content">
                            <div className="trait-column">
                                {selectedMeta.meta.attributes.slice(0, 4).map(attr => (
                                    <li key={attr.trait_type} className="trait-item">
                                        <div className="trait-icon-name">
                                            <img src="/1_triangle_aeons.png" alt="icon" className="trait-icon"/>
                                            <div className="trait-name">
                                                <strong>{attr.trait_type}</strong>
                                            </div>
                                        </div>
                                        <div className="trait-value ml-6">
                                            {attr.value === "Empty" ? "-" : attr.value}
                                        </div>
                                    </li>
                                ))}
                                {Array(placeholdersNeeded).fill(<PlaceholderMetadataItem />)}
                            </div>
                            <div className="trait-column">
                                {selectedMeta.meta.attributes.slice(4).map(attr => (
                                    <li key={attr.trait_type} className="trait-item">
                                        <div className="trait-icon-name">
                                            <img src="/1_triangle_aeons.png" alt="icon" className="trait-icon"/>
                                            <div className="trait-name">
                                                <strong>{attr.trait_type}</strong>
                                            </div>
                                        </div>
                                        <div className="trait-value ml-6">
                                            {attr.value === "Empty" ? "-" : attr.value}
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>


    );
};

export default ImageDetails;