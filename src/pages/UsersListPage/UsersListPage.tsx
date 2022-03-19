import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { usersListSave, selectUsersList, currentUserDataSave } from "../../app/usersSlice"

import { Loader } from "../../components/Loader/Loader";
import { SideBar } from "../../components/SideBar/SideBar";
import { UserCard } from "../../components/UserCard/UserCard";

import "./UsersListPage.scss"

export const UsersListPage: FC = () => {
    const dispatch = useAppDispatch()
    const usersList = useAppSelector(selectUsersList)
    const [loading, setLoading] = useState(false)

    const getUsersData = async () => {
        setLoading(true)

        const requst = await fetch("https://jsonplaceholder.typicode.com/users")
        const result = await requst.json()

        setLoading(false)
        dispatch(usersListSave(result))
    }

    useEffect(() => {
        dispatch(currentUserDataSave(null))
        getUsersData()
    }, [])

    return <div className="userslist-wrapper">
        <SideBar />
        <main>
            <p className="userslist-paragraph">Список пользователей</p>
            {!loading ? usersList.usersList.map((element, index) => {
                return <UserCard userData={element} key={index} />
            }) : <Loader />}
            {!loading && <p className="usercount-paragraph">{`Найдено ${usersList.usersList.length} пользователей`}</p>}
        </main>
    </div>
}