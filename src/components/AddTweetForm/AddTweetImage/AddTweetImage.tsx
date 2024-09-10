import React, { FC, memo, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MODAL } from "../../../constants/path-constants";
import { useAddTweetImageStyles } from "./AddTweetImageStyles";
import TagPeople from "./TagPeople/TagPeople";
import AddDescription from "./AddDescription/AddDescription";
import { selectImages } from "../../../store/ducks/addTweetForm/selector";
import AddTweetImagesShow from "./AddTweetImagesShow/AddTweetImagesShow";

const AddTweetImage: FC = memo((): ReactElement | null => {
    const classes = useAddTweetImageStyles();
    const location = useLocation();
    const images = useSelector(selectImages);

    if (images.length === 0) {
        return null;
    }

    return (
        <div className={location.pathname.includes(MODAL) ? classes.imageSmall : classes.image}>
            <AddTweetImagesShow images={images} />

            <div>
                <TagPeople />
                <AddDescription />
            </div>
        </div>
    );
});

export default AddTweetImage;
