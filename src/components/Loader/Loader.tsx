import React, { FC } from "react";

import "./Loader.scss"

export const Loader: FC = () => {
    return <div className="loader">
        <span className="loading-text">Loading...</span>
    </div>
}