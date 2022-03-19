import React, { useEffect, useState, useRef, FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUserData } from "../../app/usersSlice";

import { SideBar } from "../../components/SideBar/SideBar";

import "./UserPage.scss"

export const UserPage: FC = () => {
    const currentUserData: any = useAppSelector(selectCurrentUserData)
    const [formData, setFormData] = useState({ name: "", username: "", email: "", street: "", city: "", zipcode: "", phone: "", website: "", comment: "" })
    const [editMode, setEditMode] = useState(false)
    const [tarnsferData, setTarnsferData] = useState(false)

    const formSubmitButton: any = useRef(null)
    const inputName: any = useRef(null)
    const inputUserName: any = useRef(null)
    const inputEmail: any = useRef(null)
    const inputStreet: any = useRef(null)
    const inputCity: any = useRef(null)
    const inputZipCode: any = useRef(null)
    const inputPhone: any = useRef(null)
    const inputWebsite: any = useRef(null)
    const inputComment: any = useRef(null)

    const editModeHandler = () => {
        if (!editMode) {
            setEditMode(true)
        } else {
            if (inputName.current.value === "" ||
                inputUserName.current.value === "" ||
                inputEmail.current.value === "" ||
                inputStreet.current.value === "" ||
                inputCity.current.value === "" ||
                inputZipCode.current.value === "" ||
                inputPhone.current.value === "" ||
                inputWebsite.current.value === "") {
                return
            }
            setEditMode(false)
        }
    }

    const formDataUpdate = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const formSubmit = async (event: any) => {
        event.preventDefault()

        if (!editMode) return

        // произвольный API
        const url = "/api/testmywork"
        const data = JSON.stringify(formData)

        setTarnsferData(true)

        //6. Из данных формы при отправке нужно сформировать JSON и вывести его в консоль:
        console.log(data);

        // POST http://localhost:3000/api/testmywork 404 (Not Found):
        const response = await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json"
            }
        })

        const result = await response.json()
        setTarnsferData(false)
    }

    useEffect(() => {
        const { name, username, email, address: { street }, address: { city }, address: { zipcode }, phone, website } = currentUserData
        setFormData({ ...formData, name, username, email, street, city, zipcode, phone, website })

        inputName.current.value = name
        inputUserName.current.value = username
        inputEmail.current.value = email
        inputStreet.current.value = street
        inputCity.current.value = city
        inputZipCode.current.value = zipcode
        inputPhone.current.value = phone
        inputWebsite.current.value = website
    }, [])

    useEffect(() => {
        if (editMode) {
            formSubmitButton.current.style.backgroundColor = "#52CF4F"
            formSubmitButton.current.style.cursor = "pointer"

            inputName.current.style.color = "#000000"
            inputName.current.removeAttribute("readonly")

            inputUserName.current.style.color = "#000000"
            inputUserName.current.removeAttribute("readonly")

            inputEmail.current.style.color = "#000000"
            inputEmail.current.removeAttribute("readonly")

            inputStreet.current.style.color = "#000000"
            inputStreet.current.removeAttribute("readonly")

            inputCity.current.style.color = "#000000"
            inputCity.current.removeAttribute("readonly")

            inputZipCode.current.style.color = "#000000"
            inputZipCode.current.removeAttribute("readonly")

            inputPhone.current.style.color = "#000000"
            inputPhone.current.removeAttribute("readonly")

            inputWebsite.current.style.color = "#000000"
            inputWebsite.current.removeAttribute("readonly")

            inputComment.current.style.color = "#000000"
            inputComment.current.removeAttribute("readonly")
        } else {
            formSubmitButton.current.style.backgroundColor = "#afafaf"
            formSubmitButton.current.style.cursor = "default"

            inputName.current.style.color = "rgba(0, 0, 0, 0.3)"
            inputName.current.setAttribute("readonly", true)

            inputUserName.current.style.color = "rgba(0, 0, 0, 0.3)"
            inputUserName.current.setAttribute("readonly", true)

            inputEmail.current.style.color = "rgba(0, 0, 0, 0.3)"
            inputEmail.current.setAttribute("readonly", true)

            inputStreet.current.style.color = "rgba(0, 0, 0, 0.3)"
            inputStreet.current.setAttribute("readonly", true)

            inputCity.current.style.color = "rgba(0, 0, 0, 0.3)"
            inputCity.current.setAttribute("readonly", true)

            inputZipCode.current.style.color = "rgba(0, 0, 0, 0.3)"
            inputZipCode.current.setAttribute("readonly", true)

            inputPhone.current.style.color = "rgba(0, 0, 0, 0.3)"
            inputPhone.current.setAttribute("readonly", true)

            inputWebsite.current.style.color = "rgba(0, 0, 0, 0.3)"
            inputWebsite.current.setAttribute("readonly", true)

            inputComment.current.style.color = "rgba(0, 0, 0, 0.3)"
            inputComment.current.setAttribute("readonly", true)
        }
    }, [editMode])

    useEffect(() => {
        if (tarnsferData) {
            formSubmitButton.current.style.backgroundColor = "orange"
        }
    }, [tarnsferData])

    return (
        <div className="userpage-wrapper">
            <SideBar />
            <main>
                <div className="upper-container">
                    <p className="user-profile-paragraph">Профиль пользоваетля</p>
                    {!tarnsferData && <div className="editing-button" onClick={editModeHandler}><span>Редактироввать</span></div>}
                </div>

                <form id="userdata-form" onSubmit={formSubmit}>
                    <label htmlFor="name-input">Name</label>
                    <input id="name-input" type="text" name="name" ref={inputName} required onChange={formDataUpdate} />

                    <label htmlFor="username-input">User name</label>
                    <input id="username-input" type="text" name="username" ref={inputUserName} required onChange={formDataUpdate} />

                    <label htmlFor="email-input">E-mail</label>
                    <input id="email-input" type="email" name="email" ref={inputEmail} required onChange={formDataUpdate} />

                    <label htmlFor="street-input">Street</label>
                    <input id="street-input" type="text" name="street" ref={inputStreet} required onChange={formDataUpdate} />

                    <label htmlFor="city-input">City</label>
                    <input id="city-input" type="text" name="city" ref={inputCity} required onChange={formDataUpdate} />

                    <label htmlFor="zipcode-input">Zip code</label>
                    <input id="zipcode-input" type="text" name="zipcode" ref={inputZipCode} required onChange={formDataUpdate} />

                    <label htmlFor="phone-input">Phone</label>
                    <input id="phone-input" type="tel" name="phone" ref={inputPhone} required onChange={formDataUpdate} />

                    <label htmlFor="website-input">Website</label>
                    <input id="website-input" type="text" name="website" ref={inputWebsite} required onChange={formDataUpdate} />

                    <label htmlFor="comment-input">Comment</label>
                    <textarea id="comment-input" name="comment" ref={inputComment} onChange={formDataUpdate} />

                    <button type="submit" id="formsubmit-button" disabled={!editMode} ref={formSubmitButton}><span>{!tarnsferData ? "Отправить" : "Отправка..."}</span></button>
                </form>
            </main>
        </div>
    )
}