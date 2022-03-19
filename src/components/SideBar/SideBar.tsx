import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { usersListSave, selectUsersList, selectCurrentUserData, currentUserDataSave } from "../../app/usersSlice"

import "./SideBar.scss"

export const SideBar: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const usersList = useAppSelector(selectUsersList)
    const currentUserData = useAppSelector(selectCurrentUserData)

    const usersSortByCity = () => {
        let users: Array<any> = [...usersList.usersList]

        users.sort((previous, next) => {
            if (previous.address.city > next.address.city) {
                return 1
            }
            if (previous.address.city < next.address.city) {
                return -1
            }
            return 0
        })
        dispatch(usersListSave(users))
    }

    const usersSortByCompany = () => {
        let users: Array<any> = [...usersList.usersList]

        users.sort((previous, next) => {
            if (previous.company.name > next.company.name) {
                return 1
            }
            if (previous.company.name < next.company.name) {
                return -1
            }
            return 0
        })
        dispatch(usersListSave(users))
    }

    const clearCurrentUserData = () => {
        dispatch(currentUserDataSave(null))
        navigate("/")
    }

    return <aside>
        {!currentUserData && <span className="sort-text">Сортировка:</span>}
        {!currentUserData && <div className="sort-bycity-button" onClick={usersSortByCity}><span>по городу</span></div>}
        {!currentUserData && <div className="sort-bycompany-button" onClick={usersSortByCompany}><span>по компании</span></div>}
        {currentUserData && <div className="back-button" onClick={clearCurrentUserData}><span>Назад</span></div>}
    </aside>
}