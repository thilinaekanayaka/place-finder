import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import './Places.css';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { addSearchData } from "../redux/searchDataSlice";

const PlacesAutocomplete = ({ setSelected }) => {
  const dispatch = useDispatch();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    const mapData = {
      itemID: (new Date()).getTime(),
      address,
      coordinate: {
        lat,
        lng
      }
    }
    setSelected(mapData.coordinate);
    dispatch(addSearchData(mapData));
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

const Map = () => {
  const center = useMemo(() => ({ lat: 3.139003, lng: 101.686855 }), []);
  const [selected, setSelected] = useState(center);
  const selectedRecentSearch = useSelector((state) => state.searchData.selectedRecentSearch);

  useEffect(() => {
    if (selectedRecentSearch) {
      setSelected(selectedRecentSearch?.coordinate);
    }
  }, [selectedRecentSearch]);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={13}
        center={selected}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const Places = () => {
  const [libraries] = useState(['places']);
  const [onLoad, setLoaded] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDKNLajbe4t24eGdT-Q8XW6zX4llhoCmtM",
    libraries: libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

export default Places;