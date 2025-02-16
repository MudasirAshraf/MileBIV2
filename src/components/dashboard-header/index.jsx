import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateDashboard } from '../../actions/dashboardActions';

const DashboardHeader = ({ dashboard, updateDashboard }) => {
    const [headerConfig, setHeaderConfig] = useState(dashboard?.dashboardHeader || {
        logo: null,
        title: 'Title 1',
        background: '',
        headerHeight: '100',
        textColor: '#ffffff',
        isEditMode: false,
    });

    useEffect(() => {
        setHeaderConfig(dashboard?.dashboardHeader || {
            logo: null,
            title: 'Title 1',
            background: '',
            headerHeight: '100',
            textColor: '#ffffff',
            isEditMode: false,
        });
        setHeaderConfig((prev) => ({ ...prev, isEditMode: false }));
    }, dashboard)

    const handleImageUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeaderConfig(prev => ({
                    ...prev,
                    [type]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHeaderConfig(prev => ({ ...prev, [name]: value }));
    };

    const toggleEditMode = async () => {
        if (headerConfig.isEditMode) {
            dashboard = { ...dashboard, dashboardHeader: headerConfig }
            await updateDashboard(dashboard)
        }
        setHeaderConfig(prev => ({ ...prev, isEditMode: !prev.isEditMode }));
    };

    return (
        <div
            className="dashboard-header"
            style={{
                background: headerConfig.background.startsWith('data:image') ? `url(${headerConfig.background})` : headerConfig.background,
                // backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: headerConfig.headerHeight + "px",
                border: "2px solid",
                borderRadius: "18px",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            {headerConfig.logo && !headerConfig.isEditMode && (
                <img
                    src={headerConfig.logo}
                    alt="Logo"
                    style={{
                        position: 'absolute',
                        left: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                    }}
                />
            )}

            {!headerConfig.isEditMode && headerConfig.title && (
                <h1 style={{ color: headerConfig.textColor, fontSize: '24px', textAlign: 'center', margin: 0 }}>
                    {headerConfig.title}
                </h1>
            )}

            <button
                onClick={toggleEditMode}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <FontAwesomeIcon size='1x' icon={headerConfig.isEditMode ? faSave : faEdit} />
            </button>

            {headerConfig.isEditMode && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '20px',
                    borderRadius: '8px'
                }}>
                    <label htmlFor="logo-upload">Upload Logo:</label>
                    <input type="file" onChange={(e) => handleImageUpload(e, 'logo')} accept="image/*" id="logo-upload" />

                    <label htmlFor="title-input">Enter Title:</label>
                    <input type="text" id="title-input" name="title" placeholder="Enter Title" value={headerConfig.title} onChange={handleChange} />

                    <label htmlFor="background-upload">Upload Background:</label>
                    <input type="file" onChange={(e) => handleImageUpload(e, 'background')} accept="image/*" id="background-upload" />

                    <label htmlFor="background-color">Background Color:</label>
                    <input type="color" id="background-color" name="background" value={headerConfig.background} onChange={handleChange} />

                    <label htmlFor="text-color">Text Color:</label>
                    <input type="color" id="text-color" name="textColor" value={headerConfig.textColor} onChange={handleChange} />

                    <label htmlFor="header-height">Header Height:</label>
                    <input type="number" id="header-height" name="headerHeight" value={headerConfig.headerHeight} onChange={handleChange} />
                </div>
            )}
        </div>
    );
};


const mapStateToProps = (state) => ({
    dashboard: state.dashboard.current,
});

export default connect(mapStateToProps, { updateDashboard })(DashboardHeader);

