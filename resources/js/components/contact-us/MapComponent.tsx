import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import { defaults as defaultControls } from 'ol/control';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { Icon, Style } from 'ol/style';
import { useEffect, useRef, useState } from 'react';

// French overseas territories
const markers = [
    { name: 'Wallis', coordinates: [-176.2, -13.3] },
    { name: 'Madagascar', coordinates: [47.5, -18.8] },
    { name: 'Réunion', coordinates: [55.5, -21.1] },
    { name: 'Mayotte', coordinates: [45.2, -12.8] },
    { name: 'Papouasie-Nouvelle-Guinée', coordinates: [143.5, -6.3] },
    { name: 'Nouvelle-Calédonie', coordinates: [165.6, -21.3] },
];

const MapComponent = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Map | null>(null);
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [popupCoord, setPopupCoord] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (!mapRef.current || map) return;

        // Create marker features
        const features = markers.map((marker) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat(marker.coordinates)),
                name: marker.name,
            });

            // Use red pin marker style matching the image
            feature.setStyle(
                new Style({
                    image: new Icon({
                        src: '/assets/map/marker-icon.png',
                        scale: 1,
                        anchor: [0.5, 1],
                    }),
                }),
            );
            return feature;
        });

        const vectorSource = new VectorSource({ features });
        const vectorLayer = new VectorLayer({
            source: vectorSource,
            zIndex: 10, // Ensure markers appear above map tiles
        });

        // Base layers matching the image style
        const osmLayer = new TileLayer({
            source: new OSM(),
            visible: true,
            zIndex: 0,
        });

        const satelliteLayer = new TileLayer({
            source: new XYZ({
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            }),
            visible: false,
            zIndex: 0,
        });

        const reliefLayer = new TileLayer({
            source: new XYZ({
                url: 'https://tile.opentopomap.org/{z}/{x}/{y}.png',
                attributions: 'Map data: © Geopolynesie',
            }),
            visible: false,
            zIndex: 0,
        });

        // Create and set up the map
        const newMap = new Map({
            target: mapRef.current,
            layers: [osmLayer, satelliteLayer, reliefLayer, vectorLayer],
            controls: defaultControls({ zoom: false, rotate: false }).extend([]),
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
                minZoom: 2,
                maxZoom: 18,
            }),
        });

        // Handle popup on click
        newMap.on('click', (e) => {
            const feature = newMap.forEachFeatureAtPixel(e.pixel, (f) => f);
            if (feature && feature.get('name')) {
                setSelectedName(feature.get('name'));
                setPopupCoord([e.coordinate[0], e.coordinate[1]]);
            } else {
                setSelectedName(null);
                setPopupCoord(null);
            }
        });

        setMap(newMap);

        return () => {
            newMap.setTarget(undefined);
        };
    }, []);

    // Layer switching handler
    const handleLayerChange = (layerName: string) => {
        if (!map) return;

        // Get all base layers (excluding vector layer)
        const layers = map.getLayers().getArray();
        const osmLayer = layers[0] as TileLayer<OSM>;
        const satelliteLayer = layers[1] as TileLayer<XYZ>;
        const reliefLayer = layers[2] as TileLayer<XYZ>;

        // Hide all base layers first
        osmLayer.setVisible(false);
        satelliteLayer.setVisible(false);
        reliefLayer.setVisible(false);

        // Show the selected layer
        if (layerName === 'Plan') osmLayer.setVisible(true);
        if (layerName === 'Satellite') satelliteLayer.setVisible(true);
        if (layerName === 'Relief') reliefLayer.setVisible(true);
    };

    return (
        <div className="relative">
            {/* Map controls matching the image layout */}
            <div className="absolute top-2 left-2 z-10 flex rounded-md bg-white p-1">
                <button
                    onClick={() => handleLayerChange('Plan')}
                    className="mr-1 cursor-pointer rounded-sm px-3 py-1 text-sm text-gray-700 focus:outline-none"
                    style={{
                        backgroundColor: map?.getLayers().getArray()[0].getVisible() ? '#e6e6e6' : 'transparent',
                    }}
                >
                    Plan
                </button>
                <button
                    onClick={() => handleLayerChange('Satellite')}
                    className="mr-1 cursor-pointer rounded-sm px-3 py-1 text-sm text-gray-700 focus:outline-none"
                    style={{
                        backgroundColor: map?.getLayers().getArray()[1].getVisible() ? '#e6e6e6' : 'transparent',
                    }}
                >
                    Satellite
                </button>
                <button
                    onClick={() => handleLayerChange('Relief')}
                    className="cursor-pointer rounded-sm px-3 py-1 text-sm text-gray-700 focus:outline-none"
                    style={{
                        backgroundColor: map?.getLayers().getArray()[2].getVisible() ? '#e6e6e6' : 'transparent',
                    }}
                >
                    Relief
                </button>
            </div>

            {/* Zoom controls matching the image */}
            <div className="absolute top-20 right-2 z-10 flex flex-col rounded-md bg-white">
                <button
                    className="cursor-pointer border-b border-gray-200 p-2 text-gray-700 focus:outline-none"
                    onClick={() => map?.getView().setZoom((map?.getView().getZoom() || 0) + 1)}
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
                <button
                    className="cursor-pointer p-2 text-gray-700 focus:outline-none"
                    onClick={() => map?.getView().setZoom((map?.getView().getZoom() || 0) - 1)}
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                </button>
            </div>

            {/* Map container */}
            <div ref={mapRef} className="rounded-lg" style={{ height: '500px', width: '100%' }}></div>

            {/* Popup for marker when clicked */}
            {popupCoord && selectedName && (
                <div
                    className="absolute z-50 -translate-x-1/2 transform rounded-md bg-white p-3 shadow-lg"
                    style={{
                        left: '50%',
                        bottom: '60px',
                        minWidth: '100px',
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-800">{selectedName}</div>
                        <button onClick={() => setPopupCoord(null)} className="ml-4 cursor-pointer text-red-500 hover:text-red-700">
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
