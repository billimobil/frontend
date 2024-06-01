import React from 'react';
import { NavLink } from "react-router-dom";
import cs from "./Navbar.module.css";

const Navbar = ({ user }) => {
    let admin = window.location.pathname.startsWith("/admin/");

    return (
        <header className={cs.header}>
            <NavLink to="/">
                <h1 className={cs.logo}>WEBMOBIL</h1>
            </NavLink>
            <div className={cs.header__navbar}>
                {user ? (
                    admin ? (
                        <>
                            <NavLink className={cs.header__nav__link} to="/admin/professions">Профессии</NavLink>
                            <NavLink className={cs.header__nav__link} to="/admin/infographics">Инфографика</NavLink>
                            <NavLink className={cs.header__nav__link} to="/admin/professions">Результаты тестов</NavLink>
                            <NavLink className={cs.header__nav__link} to="/exit">Выйти</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink className={cs.header__nav__link} to="/tests">Тесты</NavLink>
                            <NavLink className={cs.header__nav__link} to="/ResultsOfPerson">Результаты тестов</NavLink>
                            <NavLink className={cs.header__nav__link} to="/Pulse">Пульс</NavLink>
                            <NavLink className={cs.header__nav__link} to="/PVK">ПВК</NavLink>
                            <NavLink className={cs.header__nav__link} to="/experts">Эксперты</NavLink>
                            <NavLink className={cs.header__nav__link} to="/exit">Выйти</NavLink>
                        </>
                    )
                ) : (
                    <>
                        <NavLink className={cs.header__nav__link} to="/login">Войти</NavLink>
                        <NavLink className={cs.header__nav__link} to="/register">Зарегистрироваться</NavLink>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
