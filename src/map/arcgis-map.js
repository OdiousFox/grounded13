import React, { Component } from "react";
import { createRoot } from "react-dom/client";  // Import createRoot
import {Map, WebMap} from "@esri/react-arcgis";

import "./arcgis-map.css";

class ArcgisMap extends Component {
    render() {
        return (
            // <Map className={"map-container"}
            //     mapProperties={{ basemap: "streets-vector" }}
            //     viewProperties={{ center: [-90, 38] }}
            //     loaderOptions={{ version: "4.13", css: true }}
            // />
        <WebMap className={"map-container"}
                id="c711e980dcae489297c9646fc686a8c5"  // Replace with your WebMap ID
                loaderOptions={{ version: "4.13", css: true }}
        />
        );
    }
}

export default ArcgisMap;
