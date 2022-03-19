import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { selectCurrentUserData } from "./app/usersSlice";

import { UsersListPage } from "./pages/UsersListPage/UsersListPage"
import { UserPage } from "./pages/UserPage/UserPage"

export const useRoutes = () => {
    const currentUserData = useAppSelector(selectCurrentUserData)

    if (currentUserData) {
        return <Routes>
            <Route path="/" element={< UsersListPage />}></Route >
            <Route path="/userdetails" element={<UserPage />}></Route >
            <Route path="*" element={<UserPage />}></Route >
        </Routes>
    }

    return <Routes>
        <Route path="/" element={< UsersListPage />}></Route >
        <Route path="*" element={< UsersListPage />}></Route >
    </Routes>
}