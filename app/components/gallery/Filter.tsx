import React, { useEffect, useState } from 'react';
import './Filter.css';
import Image from "next/image";
import { json } from 'stream/consumers';
import { MetaData, TraitsData, collection, configuration, filtes, filer } from './metadataTypes';
import { divider } from '@nextui-org/theme';
interface FilterProps {
    collection: collection
    traits: Record<string, string[]>;
    activeFilters: Record<string, string[]>;
    onFilterChange: (traitType: string, value: string) => void;
    setFilters: (filters: Record<string, string[]>) => void;
    setSearchValue: (searchTerm: string) => void;
    filterCha: (traitType: string, value: string, trat:string)=> void; 
    searchValue: string;
}

function filterIsActive(conf: string, cates: string, trat:string) : boolean {
    let fa = false;
    (filtes as filer[]).forEach((s)=>{
        if(s.names == conf){
            let a = false;
            s.cate.forEach((f, i)=>{
                if(f.name == cates){
                    a = true;
                    let g = false;
                    f.trats.forEach((t, j)=>{
                        if(t == trat){
                            g = true;
                            fa = true;
                            return true;
                        }
                    })

                   
                }
            })
            
        }
    })
    if(fa){
        return true;
    }
    return false;
}

const Filter: React.FC<FilterProps> = ({ traits, activeFilters, onFilterChange, setFilters, setSearchValue, searchValue, collection, filterCha }) => {
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const [totalActiveFilters, setTotalActiveFilters] = useState(0);
    const [coll, setcoll] = useState<collection>();
    useEffect(() => {
        const total = Object.values(activeFilters).reduce((total, filters) => total + filters.length, 0) + (searchValue.length > 0 ? 1 : 0);
        setTotalActiveFilters(total);
        setcoll(collection)
    }, [activeFilters, searchValue, collection]);

    const handleChange = (traitType: string, value: string, trat:string) => {
        filterCha(traitType, value, trat)
        onFilterChange(traitType, value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const toggleCategory = (category: string) => {
        setExpandedCategories(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    };

    if (coll == undefined) return

    return (
        <div className="filter-container">
            <h2 className="filter-header">
                <span className="aeons-white">FILT</span><span className="aeons-yellow">ER</span>
            </h2>

            <div className="label-area" >
                <div className="filter-label non-clickable-label">
                    <div className="label-content">
                        <div className="rotate-icon expanded">
                            <Image src='/1_triangle_aeons.png' alt="expand-icon" width={13} height={13} />
                        </div>
                        Search
                    </div>
                </div>

                <div className="ml-3 mt-2">
                    <input
                        className="search-input search-input-font"
                        placeholder="Aeon Number / Inscription ID"
                        onChange={handleInputChange}
                        value={searchValue}
                    />
                </div>
            </div>

            {Object.entries(coll.configurations).map(([_, config]) => (
                <div key={config.name} className="label-area">
                    <div className="filter-label" onClick={() => toggleCategory(config.name)}>
                        <div className="label-content">
                            <div className={`rotate-icon ${expandedCategories[config.name] ? 'expanded' : ''}`}>
                                <Image src='/1_triangle_aeons.png' alt="expand-icon" width={13} height={13} />
                            </div>
                            {config.name}
                        </div>
                    </div>
                    {expandedCategories[config.name] && (
                        <div className="expanded-area ml-3 mt-2">
                            {config.categories.map(option => (
                                <div key={option.name} className="label-area">
                                    <div className="filter-label" onClick={() => toggleCategory(option.name)}>
                                        <div className="label-content">
                                            <div className={`rotate-icon ${expandedCategories[option.name] ? 'expanded' : ''}`}>
                                                <Image src='/1_triangle_aeons.png' alt="expand-icon" width={13} height={13} />
                                            </div>
                                            {option.name}
                                        </div>
                                    </div>
                                    {expandedCategories[option.name] && (
                                        <div className="expanded-area">
                                            {
                                                option.traits.map(trait => (
                                                    <button
                                                        key={trait.id}
                                                        className={`filter-option ${filterIsActive(config.name,option.name, trait.id) ? 'active' : ''}`}
                                                        onClick={() => handleChange(config.name, option.name, trait.id)}
                                                    >
                                                        
                                                        {`${trait.id == "empty.webp"? "Empty" : trait.id.substring(trait.id.length - 7, trait.id.length - 5)}`}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))
            }

            <button
                className="ml-3 clear-filter mt-4 mb-2 aeons-white"
                onClick={() => {
                    setFilters({});
                    setSearchValue('');
                }}
            >
                Clear Filters ({totalActiveFilters})
            </button>
        </div>
    );
};

export default Filter;