import React from 'react';
import { MetaData } from './metadataTypes';
import Image from 'next/image';
import './ImageDetails.css';
import generatedNft from './generated';

interface ImageDetailsProps {
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

const ImageDetails: React.FC<ImageDetailsProps> = ({ selectedImage }) => {
    const imageUrl = selectedImage || '';
    const n = (selectedImage ? selectedImage : 0)
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;
    
    
    return (

    <div className="image-metadata-container">
        <div className="metadata-grid-column">
            <div>
                <Image
                    src={generatedNft[n]}
                    alt={"" + n}
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