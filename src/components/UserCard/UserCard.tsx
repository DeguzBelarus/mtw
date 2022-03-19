import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { currentUserDataSave } from "../../app/usersSlice"

import "./UserCard.scss"

interface Props {
    userData: any
}

export const UserCard: FC<Props> = ({ userData }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const getCurrentUserData = () => {
        dispatch(currentUserDataSave(userData))
        navigate("/userdetails")
    }

    return (
        <div className="usercard-wrapper">
            <p>ФИО:<span>{userData.name}</span></p>
            <p>город:<span>{userData.address.city}</span></p>
            <p>компания:<span>{userData.company.name}</span></p>
            <span className="details-link" onClick={getCurrentUserData}>Подробнее</span>
        </div >
    )
}