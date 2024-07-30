import React, { useState } from 'react';
import "./workspaces.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Book from "../../assets/svg/book.svg";
import CardV from '../../components/card-V';

const WorkSpaces = () => {
  const [cardsData, setCardsData] = useState([
    { id: 1, date: "23 Mar 2024", dashboard: "Dashboard", datasets: 'Datasets', title: "DASO" },
    { id: 2, date: "23 Apr 2022", dashboard: "Dashboard", datasets: 'Datasets', title: "ARROW DT" },
    { id: 3, date: "13 Mar 2021", dashboard: "Dashboard", datasets: 'Datasets', title: "DASO" },
    { id: 4, date: "29 Dec 2023", dashboard: "Dashboard", datasets: "Datasets", title: "ARROW DT" },
  ]);

  const handleDelete = (id) => {
    const updatedCards = cardsData.filter(card => card.id !== id);
    setCardsData(updatedCards);
  };

  return (
    <div className='main-container-workspaces'>
      <div className='container-workspaces'>
        <DashboardWrapper workspacesCount={cardsData.length}>
          <div className='published-header'>
            <img src={Book} alt="" />
            <p>WorkSpaces</p>
            <div className='published-circle-div'>
              {cardsData.length}
            </div>
          </div>
          <div className='main-container-workspaces-cards'>
            {cardsData.map(card => (
              <CardV
                key={card.id}
                id={card.id}
                title={card.title}
                date={card.date}
                dashboard={card.dashboard}
                datasets={card.datasets}
                onDelete={handleDelete} 
              />
            ))}
          </div>
        </DashboardWrapper>
      </div>
    </div>
  );
}

export default WorkSpaces;
