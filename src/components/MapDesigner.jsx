import React, { useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { GeoSearchControl, OpenStreetMapProvider, EsriProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-geosearch/dist/geosearch.css';

window.L = L;
import 'leaflet-draw';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  // Only fly if the actual coordinates change, not just the array reference!
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center[0], center[1], zoom, map]);
  
  return null;
};

// Search Control wrapper
const SearchControl = () => {
  const map = useMap();
  
  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: {
        addressdetails: 1,
        countrycodes: 'in'
      }
    });

    // CRITICAL FIX FOR NOMINATIM SPECIFIC BUG:
    // When a user selects a result, leaflet-geosearch populates the input with the massive `display_name` 
    // string and re-queries the API. For highly specific locations (like BMS College), Nominatim gets 
    // confused by its own massive string and returns 0 results, causing the map to silently freeze.
    // We fix this by locally caching results by their exact label. If the plugin re-queries for that 
    // exact label, we instantly return the cached object, bypassing the API failure completely.
    const originalSearch = provider.search.bind(provider);
    const labelCache = {};

    provider.search = async (options) => {
      try {
        // If the query is an exact match for a label we already fetched, return it immediately
        if (labelCache[options.query]) {
          return [labelCache[options.query]];
        }

        const results = await originalSearch(options);
        
        // Cache every result by its exact label string
        if (Array.isArray(results)) {
          results.forEach(r => {
            if (r && r.label) {
              labelCache[r.label] = r;
            }
          });
          return results;
        }
        return [];
      } catch (err) {
        console.error("Geosearch provider error:", err);
        return [];
      }
    };

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchLabel: 'Enter address, building, or landmark'
    });

    map.addControl(searchControl);
    
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);
  
  return null;
};

const DrawControlWrapper = ({ onCreated, onEdited, onDeleted }) => {
  const map = useMap();
  const featureGroupRef = useRef(new L.FeatureGroup());

  useEffect(() => {
    const featureGroup = featureGroupRef.current;
    map.addLayer(featureGroup);

    const drawControl = new L.Control.Draw({
      position: 'topright',
      edit: {
        featureGroup: featureGroup,
        remove: true
      },
      draw: {
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#e1e100',
            message: '<strong>Oh snap!<strong> you can\'t draw that!' 
          },
          shapeOptions: {
            color: '#00b4d8',
            weight: 3,
            fillOpacity: 0.5
          }
        }
      }
    });

    map.addControl(drawControl);

    const handleCreated = (e) => {
      featureGroup.addLayer(e.layer);
      if (onCreated) onCreated(e);
    };

    const handleEdited = (e) => {
      if (onEdited) onEdited(e);
    };

    const handleDeleted = (e) => {
      if (onDeleted) onDeleted(e);
    };

    map.on(L.Draw.Event.CREATED, handleCreated);
    map.on(L.Draw.Event.EDITED, handleEdited);
    map.on(L.Draw.Event.DELETED, handleDeleted);

    return () => {
      map.removeControl(drawControl);
      map.removeLayer(featureGroup);
      map.off(L.Draw.Event.CREATED, handleCreated);
      map.off(L.Draw.Event.EDITED, handleEdited);
      map.off(L.Draw.Event.DELETED, handleDeleted);
    };
  }, [map, onCreated, onEdited, onDeleted]);

  return null;
};

const MapDesigner = ({ onAreaCalculated, centerLocation, theme }) => {
  const calculateAreaFromLayer = useCallback((layer) => {
    try {
      const geojson = layer.toGeoJSON();
      const areaSqMeters = turf.area(geojson);
      onAreaCalculated(areaSqMeters, geojson);
    } catch (err) {
      console.error("Error calculating area", err);
    }
  }, [onAreaCalculated]);

  const onCreated = useCallback((e) => {
    calculateAreaFromLayer(e.layer);
  }, [calculateAreaFromLayer]);

  const onEdited = useCallback((e) => {
    const layers = e.layers;
    layers.eachLayer((layer) => {
      calculateAreaFromLayer(layer);
    });
  }, [calculateAreaFromLayer]);

  const onDeleted = useCallback(() => {
    onAreaCalculated(0, null);
  }, [onAreaCalculated]);

  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm relative z-0 ${theme === 'dark' ? '[&_.leaflet-layer]:invert [&_.leaflet-layer]:hue-rotate-180 [&_.leaflet-layer]:brightness-95 [&_.leaflet-layer]:contrast-90' : ''}`}>
      <MapContainer 
        center={centerLocation} 
        zoom={18} 
        style={{ height: '100%', width: '100%' }}
        maxZoom={21}
      >
        <MapUpdater center={centerLocation} zoom={18} />
        <SearchControl />
        
        {/* Standard OSM Tiles (100% free). CSS filters above make it dark mode! */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={21}
          maxNativeZoom={19}
        />
        
        <DrawControlWrapper 
          onCreated={onCreated}
          onEdited={onEdited}
          onDeleted={onDeleted}
        />
      </MapContainer>
      
      <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 max-w-xs pointer-events-none transition-colors">
        <h4 className="font-bold text-gray-900 dark:text-white mb-1">Draw Your Roof</h4>
        <p className="text-xs text-gray-600 dark:text-gray-300">Search for your location, then use the polygon tool in the top right to trace your roof.</p>
      </div>
    </div>
  );
};

export default MapDesigner;
