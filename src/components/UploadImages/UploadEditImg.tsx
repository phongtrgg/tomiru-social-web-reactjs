import React, { FC, memo, ReactElement, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { MediaIcon } from "../../icons";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import { setEditImages, setImages } from "../../store/ducks/addTweetForm/actionCreators";

interface UploadEditImgProps {
    newImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadEditImg: FC<UploadEditImgProps> = ({ newImg }): ReactElement => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };


    const handleChangeFileInput = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
            if (event.target && event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                if (file) {
                    const fileObj = new Blob([file]);

                    const imageObject = { src: URL.createObjectURL(fileObj), file };

                    dispatch(setEditImages([imageObject]));
                    await newImg(event);
                } else {
                    console.error("No file selected.");
                }
            } else {
                console.error("Invalid event target or files not defined.");
            }
        },
        [dispatch, newImg]
    );

    useEffect(() => {
        const inputElement = inputRef.current;

        if (inputElement) {
            inputElement.addEventListener("change", handleChangeFileInput as any);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener("change", handleChangeFileInput as any);
            }
        };
    }, [handleChangeFileInput]);

    return (
        <>
            <ActionIconButton actionText={"Media"} icon={MediaIcon} onClick={handleClickImage} size={"medium"} />
            <input ref={inputRef} type="file" id="upload-input" hidden />
        </>
    );
};

export default UploadEditImg;
