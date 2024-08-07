import React from 'react';
import './SortFilterButtons.css';

type SortCriterion = 'rarity' | 'number';
type SortOrder = 'asc' | 'desc';

interface SortFilterButtonsProps {
    showFilter: boolean;
    isFilterVisible: boolean;
    increaseColumnCount: () => void;
    decreaseColumnCount: () => void;
    setIsFilterVisible: (visible: boolean) => void;
    setSort: (sort: { criterion: SortCriterion; order: SortOrder }) => void;
}

const SortFilterButtons: React.FC<SortFilterButtonsProps> = ({
                                                                 showFilter,
                                                                 isFilterVisible,
                                                                 setIsFilterVisible,
                                                                 setSort,
                                                                 increaseColumnCount,
                                                                 decreaseColumnCount
                                                             }) => (
    <div className="options">
        {showFilter ? (
            isFilterVisible ?
                <div className="ml-1 mt-1">
                    <button
                        className="options-text underline visible-button"
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                    >
                        <img src="/icons/x.svg" alt="Filter" className="filter-icon" width="26px"/>
                    </button>
                </div>
                :
                <div className="ml-4 mt-1">
                    <button
                        className="options-text underline hidden-button"
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                    >
                        <img src="/icons/filter.svg" alt="Filter" className="filter-icon" width="26px"/>
                    </button>
                </div>
        ) : (

            <div className="mr-4" style={{visibility: 'hidden'}}>
                <button className="options-text underline">
                    Placeholder
                </button>
            </div>
        )}
        <div className={`sorting-options ${isFilterVisible ? 'hide-on-mobile' : ''}`}>

            <div>
                <div className="flex mr-3 md:mr-7 mt-1">
                    <span className="options-text">ID#</span>
                    <button className="options-text" onClick={() => setSort({criterion: 'number', order: 'asc'})}>△</button>
                    <button className="options-text" onClick={() => setSort({criterion: 'number', order: 'desc'})}>▽</button>
                </div>
            </div>
            <div>
                <div className="flex mr-3 md:mr-7 mt-1 hidden-element">
                    <span className="options-text">RARITY</span>
                    <button className="options-text" onClick={() => setSort({criterion: 'rarity', order: 'asc'})}>△</button>
                    <button className="options-text" onClick={() => setSort({criterion: 'rarity', order: 'desc'})}>▽</button>
                </div>
            </div>
            <div>
                <div className="flex mr-2 md:mr-7 mt-1">
                    <span className="options-text">DISPLAY</span>
                    <button className="options-text" onClick={increaseColumnCount}>△</button>
                    <button className="options-text" onClick={decreaseColumnCount}>▽</button>
                </div>
            </div>
        </div>
    </div>
);

export default SortFilterButtons;