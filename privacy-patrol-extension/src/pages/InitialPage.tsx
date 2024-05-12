import React, { useState } from 'react';
import '../css/InitialPage.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Connections from '../components/Connections';
import Security from '../components/Security';
import Cookies from '../components/Cookies';
import Storage from '../components/Storage';

const HomePage = () => {
    const [selected, setSelected] = useState<string>('connections');

    const handleSelection = (event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
        if (newSelection !== null) {
            setSelected(newSelection);
        }
    };

    const renderComponent = () => {
        switch (selected) {
            case 'connections':
                return <Connections />;
            case 'security':
                return <Security />;
            case 'cookies':
                return <Cookies />;
            case 'storage':
                return <Storage />;
            default:
                return <div>Please select an option.</div>;
        }
    };

    return (
        <div className="HomePage">
            <ToggleButtonGroup
                value={selected}
                exclusive
                onChange={handleSelection}
                aria-label="Privacy settings"
                size="small"
            >
                <ToggleButton value="connections" aria-label="Connections">
                    Connections
                </ToggleButton>
                <ToggleButton value="security" aria-label="Security">
                    Security
                </ToggleButton>
                <ToggleButton value="cookies" aria-label="Cookies">
                    Cookies
                </ToggleButton>
                <ToggleButton value="storage" aria-label="Storage">
                    Storage
                </ToggleButton>
            </ToggleButtonGroup>
            {renderComponent()}
        </div>
    );
}

export default HomePage;
