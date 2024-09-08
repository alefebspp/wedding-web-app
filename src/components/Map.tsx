"use client";
import { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const center = {
  lat: -22.6837261,
  lng: -43.2690232,
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    language: "pt-BR"
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return (
    <div className="section">
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName="w-full h-[500px]"
          center={center}
          zoom={16}
          options={{
            mapTypeControl: false,
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <>
            <Marker position={center} />
          </>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}
