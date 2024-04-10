import logo from './logo.svg';
import './App.css';
import Map from './map/map.js';
import Header from './ui/header.js';
import MapContainer from "./map/mapcontainer";
import map from ".//images/img.png"
import Menu from "./ui/menu.js"

function App() {
    return (
        <div>
            <Header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                borderBottom: '2px solid #000',
                marginBottom: '1rem'
            }}></Header>

            <main style={{display: 'flex', flexDirection: 'row', margin: '50px'}}>
                <div style={{
                    flex: '2',
                    marginRight: '1rem'
                }}>
                    <MapContainer src={map} alt={"Map"} style={{
                        width: '100%',
                        height: '400px', // Adjust height as needed
                        objectFit: 'cover'
                    }}/>
                </div>

                <div style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                        <Menu></Menu>
                </div>
            </main>
        </div>
    );
}

export default App;
