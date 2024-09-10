import { transform } from "@babel/core";
import { Html5QrcodeScanner } from "html5-qrcode";
import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { render } from "enzyme";
import { useTranslation } from "react-i18next";

interface ScanQRProps {
    transferScreen: () => void;
    close?: any;
}

const ScanQR = ({ transferScreen, close }: ScanQRProps) => {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "render",
            {
                qrbox: {
                    width: 177.5,
                    height: 165.36
                },
                fps: 5
            },
            false
        );

        const success = (result: React.SetStateAction<string | null>) => {
            // if(scanner && close) {
            //     scanner.clear();
            // }
            // setScanResult(result);
            // if (close) {
            //     close();
            //   }

            scanner.clear();
            setScanResult(result);
        };

        const error = () => {
            console.warn("Lỗi không nhận dạng được mã QR");
        };

        scanner.render(success, error);

        return () => {
            // if(scanner && close) {
            //     scanner.clear();
            // }

            scanner.clear();
        };
    }, [close]);
    return (
        <div>
            {scanResult ? (
                <div id="render">
                    {" "}
                    Success: <a href={scanResult}> {scanResult} </a>
                    <Button onClick={transferScreen}>{t("transfer")}</Button>
                </div>
            ) : (
                <div id="render"> {t("scanning")}</div>
            )}
        </div>
    );
};
export default ScanQR;
