import React from 'react';
import "./drafts.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Draft from "../../assets/svg/DRAFTSI.svg";
import CardII from '../../components/card-II';
const Drafts = () => {
    const cardsData = [
        { title: "Sales Dashboard", publishedDate: "21-Mar-2022", lastUpdatedDate: "21-Mar-2022", statusUpdate: "draft" },
        { title: "Marketing Dashboard", publishedDate: "22-Mar-2022", lastUpdatedDate: "23-Mar-2022", statusUpdate: "draft" },
        { title: "Finance Dashboard", publishedDate: "24-Mar-2022", lastUpdatedDate: "25-Mar-2022", statusUpdate: "draft" },
        { title: "Finance Dashboard", publishedDate: "24-Mar-2022", lastUpdatedDate: "25-Mar-2022", statusUpdate: "draft" },
      ];
  return (
    <div className='main-container-drafts'>
        <div className='container-drafts'>
        <DashboardWrapper draftsCount={cardsData.length}>
        <div className='published-header'>
        <img src={Draft} alt=""/>
       <p>Drafts</p> 
       <div className='published-circle-div'>
     4
       </div>
       </div> 
       <div className="main-container-create-dashboard-card-component">
              {cardsData.map((card, index) => (
                <CardII
                  key={index}
                  title={card.title}
                  title1={card.publishedDate}
                  title2={card.lastUpdatedDate}
                  status={card.statusUpdate}
                />
              ))}
            </div>
        </DashboardWrapper>
        </div>
        </div>
  )
}

export default Drafts;