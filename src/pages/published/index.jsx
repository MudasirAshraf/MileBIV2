import React from 'react';
import "./published.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Check from "../../assets/svg/check.svg";
import CardII from '../../components/card-II';

const Published = () => {
    const cardsData = [
        { title: "Sales Dashboard", publishedDate: "21-Mar-2022", lastUpdatedDate: "21-Mar-2022", statusUpdate: "published" },
        { title: "Marketing Dashboard", publishedDate: "22-Mar-2022", lastUpdatedDate: "23-Mar-2022", statusUpdate: "published" },
        { title: "Finance Dashboard", publishedDate: "24-Mar-2022", lastUpdatedDate: "25-Mar-2022", statusUpdate: "published" },
        { title: "Finance Dashboard", publishedDate: "24-Mar-2022", lastUpdatedDate: "25-Mar-2022", statusUpdate: "published" },
      ];
  return (
    <div className='main-container-published'>
        <div className='container-published'>
       <DashboardWrapper publishedCount={cardsData.length}>
       <div className='published-header'>
        <img src={Check} alt=""/>
       <p>Published</p> 
       <div className='published-circle-div'>
         {cardsData.length}
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

export default Published;