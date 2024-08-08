import React, { useState, useEffect, useCallback } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import './ImageGallery.css';
import { MetaData, TraitsData, collection, filer, filtes, attributes, metadataNft, meta } from './metadataTypes';
import DetailsModal from './DetailsModal';
import Filter from './Filter';
import SortFilterButtons from './SortFilterButtons';
import ImageDetails from './ImageDetails';
import Image from 'next/image';
import { json } from 'node:stream/consumers';
import { BsIndent } from 'react-icons/bs';

import generatedNft from './generated';

var traitsDown = new Map<string, HTMLImageElement>();

type FiltersState = Record<string, string[]>;

const useWindowSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
            setIsLoaded(true);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial size
        
        return () => window.removeEventListener('resize', handleResize);

        
    }, []);

    return { size, isLoaded };
};

var filterB:string[] = [];
var map:Map<number, number> = new Map();

for (let i = 0; i < 3680; i++) {
    map.set(i, i);
}

const ImageGallery: React.FC = () => {
    const { size: { width, height }, isLoaded } = useWindowSize();
    const [metadata, setMetadata] = useState<Record<string, MetaData>>({});
    const [selectedMeta, setSelectedMeta] = useState<MetaData | null>(null);
    const [selectedImage, setSelectedImage] = useState<number>();
    const [collection, setCollection] = useState<collection>();
    const [traits, setTraits] = useState<TraitsData>({});
    const [filters, setFilters] = useState<FiltersState>({});
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [metadataN, setMetadataN] = useState<metadataNft[]>([]);
    const [selectedMetaN, setselectedMetaN] = useState<attributes[]>([]);


    type SortCriterion = 'rarity' | 'number';
    type SortOrder = 'asc' | 'desc';
    const [sort, setSort] = useState<{ criterion: SortCriterion; order: SortOrder }>({ criterion: 'number', order: 'asc' });

    const TOTAL_IMAGES = 3680;
    const MOBILE_THRESH_HOLD = 768;
    const imageList = Array.from({ length: TOTAL_IMAGES }, (_, index) => `/gallery/${index}.webp`);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const [metadataResponse, traitsResponse, collectionResponse, metadatar] = await Promise.all([
                    fetch('/Aeons_Metadata.json'),
                    fetch('/Aeons_AvailableTraits.json'),
                    fetch('/collection.json'),
                    fetch('/metadata.json'),
                ]);

                if (!metadataResponse.ok || !traitsResponse.ok || !collectionResponse.ok) {
                    throw new Error('Failed to fetch one or more resources');
                }

                const metadata = await metadataResponse.json();
                const traits = await traitsResponse.json();
                const collection = await collectionResponse.json();
                const m = await metadatar.json();

                setCollection(collection);
                setMetadata(metadata);
                setTraits(traits);
                setMetadataN(m);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (traitType: string, value: string) => {
        setFilters((prevFilters: FiltersState): FiltersState => {
            const currentValues = prevFilters[traitType] || [];
            if (currentValues.includes(value)) {
                return {
                    ...prevFilters,
                    [traitType]: currentValues.filter(v => v !== value),
                };
            } else {
                return {
                    ...prevFilters,
                    [traitType]: [...currentValues, value],
                };
            }
        });
    };



    const increaseColumnCount = () => {
        setColumnCount(prevCount => prevCount < 10 ? prevCount + 1 : prevCount);
    };

    const decreaseColumnCount = () => {
        setColumnCount(prevCount => {
            if (window.innerWidth <= MOBILE_THRESH_HOLD) {
                return prevCount > 2 ? prevCount - 1 : 2;
            } else if (window.innerWidth <= 1024) {
                return prevCount > 4 ? prevCount - 1 : 4;
            } else {
                return prevCount > 6 ? prevCount - 1 : 6;
            }
        });
    };

    const filteredImages:string[] = [];
    filteredImages.length = TOTAL_IMAGES; 

    const getColumnCount = useCallback(() => {
        if (width >= 1024) return 6;
        if (width >= MOBILE_THRESH_HOLD) return 4;
        return 3;
    }, [width]);

    const [columnCount, setColumnCount] = useState(3); // Set initial state to 3

    useEffect(() => {
        setColumnCount(getColumnCount()); // Update columnCount when width changes
    },
        [width, getColumnCount]);

    const columnWidth = (isFilterVisible || width < MOBILE_THRESH_HOLD) ? (Math.floor(width / columnCount) - 4) : (Math.floor(0.75 * width / columnCount));

    const handleImageClick = (imageIndex: number, filteredImages: string[]) => {
        setSelectedImageIndex(imageIndex );
        const meta = metadata["" || ''];
        setSelectedMeta(meta || null);


        let att:attributes[] = [];

        for(let t of metadataN!){
            if(Number(t.meta.name) == imageIndex){
                att = t.meta.attributes;
                break;
            }
        }
        console.log(selectedImage)
        setSelectedImage(imageIndex)
        setselectedMetaN(att)
        
    };
    const handlePrevious = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            handleImageClick(selectedImageIndex - 1, filteredImages);
        }
    };
    const handleNext = () => {
        if (selectedImageIndex !== null && selectedImageIndex < filteredImages.length - 1) {
            handleImageClick(selectedImageIndex + 1, filteredImages);
        }
    };



    function generateNFT(imageIndex: number) {
        let scriptino: string = "";
        const fetchScriptino = async () => {
            try {
                const response = await fetch(`/scripts/${imageIndex}.html`)
                let a = await response.text()
                scriptino = a;
            } catch (error) {
                console.error(`Error fetching script: ${imageIndex}`, error);
            }
        }

        const fetchData = async () => {
            try {
                await fetchScriptino();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(() => {


            //ew Promise.all(f);

            if (scriptino == "") {
                return "";
            }
            const diva = scriptino.split(" ");

            let c = diva[1]
            let s = diva[2]

            if (c == undefined || s == undefined) {
                return "";
            }

            c = diva[1].substring(2, diva[1].length)
            s = diva[2].substring(2, diva[2].length)

            const selectedTraitIndexes = s.split(",")


            if(collection == undefined){
                return;
            }
            const conf = collection!.configurations[Number(c)];

            const traits: string[] = [];

            for (let i in selectedTraitIndexes) {
                let v = selectedTraitIndexes[i];
                traits.push("traits/" + conf.name + "/" + conf.categories[i].name + "/" + conf.categories[i].traits[Number(v)].id);
            }

            let selectedTraitOrders: number[] = [];

            switch (c) {
                case "0":
                case "1":
                    selectedTraitOrders = [0, 18, 1, 3, 4, 15, 8, 13, 9, 10, 11, 5, 14, 12, 17, 6, 7, 16, 2];
                    break;
                case "2":
                case "3":
                    selectedTraitOrders = [0, 17, 1, 3, 4, 14, 7, 16, 13, 11, 5, 8, 9, 10, 12, 2, 15, 6];
                    break;
            }

            const operations = conf.categories.map((v: any, i: number) => conf.categories[i].operation);


            const genes = async () => {
                try {
                    await renderImage(traits, operations, selectedTraitOrders)

                } catch (error) {
                    console.error(`Error fetching script: ${imageIndex}`, error);
                }
            }

            const g = async () => {
                try {
                    await genes();
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            g();

            async function loadImage(url: string): Promise<HTMLImageElement> {
                return new Promise((resolve, reject) => {
                    const a = traitsDown.get(url);
                    if (a != undefined) {
                        resolve(a);
                        return
                    }

                    const image = document.createElement('img');
                    image.src = url;
                    image.crossOrigin = 'anonymous';
                    image.onload = () => {
                        traitsDown.set(url, image);
                        resolve(image);
                    }
                    image.onerror = () => reject(new Error(`Failed to load image from ${url}`));
                });
            }
            let genereatedUrl: string = "";

            async function renderImage(urls: string[], operations: any, order: any) {

                if (generatedNft[imageIndex]) {
                    if(document != undefined){
                        if((document.getElementById(String(imageIndex)) as HTMLImageElement)!= undefined){
                            (document.getElementById(String(imageIndex)) as HTMLImageElement).src = generatedNft[imageIndex];
                        }
                    }
                    return generatedNft[imageIndex]
                }

                if(document == undefined){
                    return;
                }
                const canvas = document.createElement('canvas');
                const renderSize = { width: 500, height: 500 };
                canvas.width = renderSize.width;
                canvas.height = renderSize.height;

                const ctx = canvas.getContext("2d");
                ctx!.imageSmoothingEnabled = false;

                const images: CanvasImageSource[] = await Promise.all((urls).map(loadImage))


                for (let n of order) {
                    ctx!.globalCompositeOperation = operations[n];
                    ctx!.drawImage(images[n], 0, 0, canvas.width, canvas.height);
                }
                if(document == undefined){
                    return;
                }
                let img = document.getElementById(String(imageIndex))
                generatedNft[imageIndex] = canvas.toDataURL("image/png");
                if(img == undefined){return  generatedNft[imageIndex]}
                img!.setAttribute('src', canvas.toDataURL("image/png"));
            }
        });
    }
    
    function fileterCha(conf: string, cates: string, trat:string) : void{
        
        filtes.forEach((s)=>{
            if(s.names == conf){
                let a = false;

                s.cate.forEach((f, i)=>{
                    if(f.name == cates){
                        a = true;
                        let g = false;
                        f.trats.forEach((t, j)=>{
                            if(t == trat){
                                delete f.trats[j];
                                g = true;
                            }
                        })

                        if(!g){
                            f.trats.push(trat)
                        }

                        return
                    }
                })
                if(!a){
                    s.cate.push({name:cates, trats:[]});
                    
                    s.cate.forEach((f, i)=>{
                        if(f.name == cates){
                            let g = false;
                            f.trats.forEach((t, j)=>{
                                if(t == trat){
                                    delete f.trats[j];
                                    g = true;
                                }
                            })
    
                            if(!g){
                                f.trats.push(trat)
                            }
    
                            return
                        }
                    })

                }
            }
        })
        filterB = [];
        filtes.forEach(cate=>{
            cate.cate.forEach(a =>{
                a.trats.forEach(t=>{
                    filterB.push(cate.names+a.name+t)
                })
            })
        })

        map.clear();
        let inserti = 0;
        if(filterB.length == 0){
            for(let i = 0; i < TOTAL_IMAGES; i++){
                map.set(i, i);
            }
            return;
        }
        for(let i = 0; i < TOTAL_IMAGES; i++){


            while (inserti < TOTAL_IMAGES) {
        
                let fa = false;
                let m:meta = getmetadataNFT(inserti);
                let attB:String[] = []
                m.attributes.forEach(t=>{
                    attB.push(m.configuration+t.trait_type+t.value +  ".webp")
                })
                for(let f of filterB){
                    if(!attB.includes(f)){
                        fa = true;
                    }
                }

                if(fa){
                    inserti++;
                    continue;
                }
                break;
            }
            if (inserti >= TOTAL_IMAGES) {
                for(; i < TOTAL_IMAGES; i++){
                    map.set(i, -1);
                }
            }

            map.set(i, inserti++);

        }

    }
    

    function getmetadataNFT(i:number) : meta {
        let att:meta = {attributes:[], configuration:"", name:""};

        for(let t of metadataN!){
            if(Number(t.meta.name) == i){
                att = t.meta;
                break;
            }
        }
        return att;
    }

    const Cell: React.FC<{ columnIndex: number; rowIndex: number; style: React.CSSProperties }> = ({
        columnIndex,
        rowIndex,
        style
    }) => {

        let  imageIndex = rowIndex * columnCount + columnIndex;
        
        if (imageIndex >= TOTAL_IMAGES) return null;
        
        if(searchValue.length != 0){
            if(imageIndex > 0) return null;
            imageIndex = Number(searchValue)
        }
        let mapImageIndex = map.get(imageIndex)!;
        

        if (mapImageIndex == -1) return null;

        if (generatedNft[mapImageIndex]) {

            return (
                <div style={style} className="p-1">

                    <div className="relative w-full h-full border-3 md:border-4 border-white bg-transparent rounded-sm">
                        <Image
                            className="object-cover w-full h-full pixelated"


                            src={`${generatedNft[mapImageIndex]}`}

                            id={`${mapImageIndex}`}
                            alt={`Image ${mapImageIndex + 1}`}
                            onClick={() => handleImageClick(imageIndex, filteredImages)}
                            style={{ cursor: 'pointer' }}
                            width={columnWidth}
                            height={columnWidth}
                        />
                    </div>

                </div>
            );
        } else {
            generateNFT(mapImageIndex);
            return (
                <div style={style} className="p-1">

                    <div className="relative w-full h-full border-3 md:border-4 border-white bg-transparent rounded-sm">
                        <Image
                            className="object-cover w-full h-full pixelated"


                            src={`/loading.gif`}
                            priority={true} 
                            id={`${mapImageIndex}`}
                            alt={`Image ${mapImageIndex + 1}`}
                            onClick={() => handleImageClick(imageIndex, filteredImages)}
                            style={{ cursor: 'pointer' }}
                            width={columnWidth}
                            height={columnWidth}
                        />
                    </div>

                </div>
            );
        }
    };

    let select = undefined;
    if (selectedImage != undefined){
        select = map.get(selectedImage);
        if (select == undefined) select = 0;

        if (!generatedNft[selectedImage])
        {
            generateNFT(select);
        }
    }
    return (
        <div className="expand-flex">
            <div className="attributes-container gallery-content ">

                <SortFilterButtons showFilter={width <= MOBILE_THRESH_HOLD} isFilterVisible={isFilterVisible} setIsFilterVisible={setIsFilterVisible} setSort={setSort} decreaseColumnCount={decreaseColumnCount} increaseColumnCount={increaseColumnCount} />

                <div className="mt-1 md:mt-2 flex justify-between">
                    {isFilterVisible || width >= MOBILE_THRESH_HOLD ? (
                        <div className={`${width < MOBILE_THRESH_HOLD ? 'w-full' : 'w-1/4'} pl-0`}>
                            <Filter
                                traits={traits}
                                activeFilters={filters}
                                onFilterChange={handleFilterChange}
                                setFilters={setFilters}
                                setSearchValue={setSearchValue}
                                searchValue={searchValue}
                                filterCha={fileterCha}
                                collection={collection as collection}
                            />
                        </div>
                    ) : null}
                    <div
                        className={`${isFilterVisible && width < MOBILE_THRESH_HOLD ? 'hidden' : (width < MOBILE_THRESH_HOLD ? 'w-full' : 'w-3/4')} flex justify-center grid-container-shadow`}>
                        {isLoaded && width > 0 && height > 0 && (
                            <Grid
                                columnCount={columnCount}
                                columnWidth={(isFilterVisible || width < MOBILE_THRESH_HOLD) ? columnWidth : columnWidth - 3}
                                height={height - 40}
                                rowCount={Math.ceil(filteredImages.length / columnCount)}
                                rowHeight={columnWidth}
                                width={(isFilterVisible || width < MOBILE_THRESH_HOLD) ? (width) : (0.75 * width)}
                                className="grid"
                            >
                                {Cell}
                            </Grid>
                        )}
                        {select != undefined && (
                            <DetailsModal onClose={() => {setSelectedMeta(null); setSelectedImage(undefined)}} onNext={handleNext} onPrevious={handlePrevious}>
                                <ImageDetails selectedImage={select}/>
                            </DetailsModal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
