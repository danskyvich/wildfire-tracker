import * as turf from '@turf/turf'

// instantiate geojson and linestring
export function createMeasureState() {
    {/* GeoJSON */}
    const geojson: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection', features: []
    };

    {/* LineString */}
    const linestring: GeoJSON.Feature<GeoJSON.LineString> = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: [],
        },
        properties: {},
    };
    return { geojson, linestring }
}

export function toggleMeasurePoint(
    state: ReturnType<typeof createMeasureState>,
    clickedFeatureId: string | undefined,
    lngLat: { lng: number, lat: number},
) {
    const { geojson, linestring } = state;

    if (geojson.features.length > 1) geojson.features.pop();

    if (clickedFeatureId) {
        geojson.features = geojson.features.filter((p) => p.properties?.id !== clickedFeatureId);
    } else {
        geojson.features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [lngLat.lng, lngLat.lat]
            },
            properties: {
                id: String(Date.now())
            },
        });
    }

    let distanceKm: number | null = null;
    if (geojson.features.length > 1) {
        linestring.geometry.coordinates = geojson.features.map(
            p => (p.geometry as GeoJSON.Point).coordinates
        );
        geojson.features.push(linestring);
        distanceKm = turf.length(linestring);
    }

    return { geojson, distanceKm};
}

export function clearMeasureState(
    state: ReturnType<typeof createMeasureState>
) {
    state.geojson.features = [];
}