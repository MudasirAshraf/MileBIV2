import React, { useState } from 'react';
import "./workspace-dashboard.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Book from "../../assets/svg/book.svg";
import EDIT from "../../assets/svg/editpen.svg";
import SmallArrow from '../../assets/svg/rightwhite.svg';
import Hline from "../../assets/svg/headerline.svg";
import CardII from '../../components/card-II';
import CardIV from '../../components/card-IV';
import Filter from "../../assets/svg/Filter.svg";

const WorkspaceDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboards');
    const [showFilters, setShowFilters] = useState(false);
    const [showPublished, setShowPublished] = useState(true); 
    const [showDrafts, setShowDrafts] = useState(true); 

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleFilterClick = () => {
        setShowFilters(!showFilters);
    };

    const handlePublishCheckboxChange = () => {
        setShowPublished(!showPublished);
    };

    const handleDraftsCheckboxChange = () => {
        setShowDrafts(!showDrafts);
    };

    const cardsData = [
        { title: "Sales Dashboard", publishedDate: "21-Mar-2022", lastUpdatedDate: "21-Mar-2022", statusUpdate: "published" },
        { title: "Marketing Dashboard", publishedDate: "22-Mar-2022", lastUpdatedDate: "23-Mar-2022", statusUpdate: "draft" },
        { title: "Employee Dashboard", publishedDate: "24-Mar-2022", lastUpdatedDate: "25-Mar-2022", statusUpdate: "published" },
        { title: "Sales Dashboard", publishedDate: "21-Mar-2022", lastUpdatedDate: "21-Mar-2022", statusUpdate: "published" },
        { title: "Marketing Dashboard", publishedDate: "22-Mar-2022", lastUpdatedDate: "23-Mar-2022", statusUpdate: "draft" },
        { title: "Employee Dashboard", publishedDate: "24-Mar-2022", lastUpdatedDate: "25-Mar-2022", statusUpdate: "published" },
    ];
    
    const cardsDataII = [
        { title: "sales 2022" },
        { title: "Balance Sheet 2022" },
        { title: "Employee Data" },
    ];

    // Filtered cards based on checkbox selections
    const filteredCards = cardsData.filter(card => {
        if (showPublished && showDrafts) {
            return true; // Show all cards
        } else if (showPublished && card.statusUpdate === "published") {
            return true; 
        } else if (showDrafts && card.statusUpdate === "draft") {
            return true; // Show only draft cards
        }
        return false;
    });

    return (
        <div className='main-container-workspace-dashboard'>
            <div className='container-workspace-dashboard'>
                <DashboardWrapper>
                    <div className='header-container-workspace-dashboard'>
                        <div className='first-row-header'>
                            <img src={Book} alt="logo" />
                            <p>Workspaces</p>
                        </div>
                        <div className='second-row-header'>
                            <img src={SmallArrow} alt="logo" />
                        </div>
                        <div className='third-row-header'>
                            <p>DASO</p>
                            <img src={EDIT} alt="logo" />
                        </div>
                    </div>
                    <div className='second-header-links'>
                        <div className={`first-link-workspace-dashboard ${activeTab === "dashboards" ? "active" : ""}`}>
                            <a href="#" className='link-workspace-dashboard' onClick={() => handleTabClick('dashboards')}>Dashboards</a>
                            <div className='alert-circle-workspace-dashboard'>10</div>
                        </div>
                        <div className={`second-link-workspace-dashboard ${activeTab === "datasets" ? "active" : ""}`}>
                            <a href="#" className='link-workspace-dashboard' onClick={() => handleTabClick('datasets')}>Datasets</a>
                            <div className='alert-circle-workspace-dashboard'>10</div>
                        </div>
                    </div>
                    <div>
                        <img src={Hline} alt="logo" />
                    </div>
                    {activeTab === 'dashboards' && (
                        <div>
                            <div className='main-container-filter-data'>
                                <div className='filter-data-div' onClick={handleFilterClick}>
                                    <p>Filter by</p>
                                    <img src={Filter} alt="logo"/>
                                </div>
                                {showFilters && (
                                    <div className='filter-options'>
                                        <label>
                                            <input type="checkbox" name="publish" checked={showPublished} onChange={handlePublishCheckboxChange} />
                                            Publish
                                        </label>
                                        <label>
                                            <input type="checkbox" name="drafts" checked={showDrafts} onChange={handleDraftsCheckboxChange} />
                                            Drafts
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div className="main-container-workspace-card-component">
                                {filteredCards.map((card, index) => (
                                    <CardII
                                        key={index}
                                        title={card.title}
                                        title1={card.publishedDate}
                                        title2={card.lastUpdatedDate}
                                        status={card.statusUpdate}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'datasets' && (
                        <div className='main-container-datasets'>
                            {cardsDataII.map((card, index) => (
                                <CardIV
                                    key={index}
                                    title={card.title}
                                />
                            ))}
                        </div>
                    )}
                </DashboardWrapper>
            </div>
        </div>
    );
}

export default WorkspaceDashboard;
