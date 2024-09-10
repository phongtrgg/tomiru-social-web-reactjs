import React, { FC, ReactElement } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map: FC = (): ReactElement => {
    const centerPosition: [number, number] = [21.0285, 105.8542];

    return (
        <>
            <div
                style={{ height: "50px", fontSize: "25px", marginTop: "15px", fontWeight: "bold", marginLeft: "15px" }}
            >
                Bản đồ
            </div>
            <div style={{ height: "500px", margin: "auto", overflow: "hidden" }}>
                <MapContainer center={centerPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {/* <Marker position={centerPosition}>
                        <Popup>
                            Đây là vị trí trung tâm.
                            <img width={200} height={200} src="https://st.quantrimang.com/photos/image/2020/06/19/Hinh-Nen-Meo-Ngao-38.jpg" alt="" />
                        </Popup>
                    </Marker> */}
                </MapContainer>
            </div>
        </>
    );
};

export default Map;
