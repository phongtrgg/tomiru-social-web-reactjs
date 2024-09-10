import React, { FC, memo, ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MODAL } from "../../../constants/path-constants";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { CloseIcon } from "../../../icons";
import { useAddTweetImageStyles } from "./AddTweetImageStyles";
import TagPeople from "./TagPeople/TagPeople";
import AddDescription from "./AddDescription/AddDescription";

interface EditModalImageProps {
    imagesTweet?: string | undefined;
    onRemove?: () => void;
}

const EditModalImage: FC<EditModalImageProps> = ({ imagesTweet, onRemove }): ReactElement | null => {
    const classes = useAddTweetImageStyles();
    const location = useLocation();
    const [img, setImg] = useState<string | undefined>(imagesTweet);

    useEffect(() => {
        setImg(imagesTweet);
    }, [imagesTweet]);

    const onClickRemoveImage = (): void => {
        setImg(undefined);
        if (onRemove) onRemove();
    };

    if (!imagesTweet) {
        return null;
    }

    return (
        <div className={location.pathname.includes(MODAL) ? classes.imageSmall : classes.image}>
            {img && (
                <div>
                    <img src={img} alt={img} style={{ width: "90%" }} />
                    <div>
                        <TagPeople />
                        <AddDescription />
                    </div>
                    <div className={classes.imageRemove}>
                        <ActionIconButton
                            actionText={"Remove"}
                            icon={CloseIcon}
                            onClick={onClickRemoveImage}
                            size={"medium"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditModalImage;
