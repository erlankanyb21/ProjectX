import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../icon.png'
import '../styles/Navbar.css'; 


const tasks = [
    { id: 1, name: "Лицензия на выпуск карт Visa", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 647933, deadline: "Кол-во врем лицензии - 2678000 Текущее значение- 2030067" },
    { id: 2, name: "Лицензия на выпуск карт Элкарт", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 85387, deadline: "Постоян лицензия - 681000 Тек. Значение- 595613" },
    { id: 3, name: "Лицензия на выпуск карт Visa Virtual", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 158518, deadline: "Кол-во врем лицензии - 450000 Текущее значение- 291482" },
    { id: 4, name: "Сертификат CAM WS", group: "Эмиссия", status: "GOOD", priority: 3, quantity: "Годен с: 21/03/2024", deadline: "3/20/2028" },
    { id: 5, name: "Сертификат ZDO", group: "Эмиссия", status: "GOOD", priority: 3, quantity: "Годен с: 13/03/2024", deadline: "3/13/2025" },
    { id: 6, name: "Visa Gold", group: "Эмиссия", status: "BAD", priority: 1, quantity: 188500, additional_info: "ручной подсчет" },
    { id: 7, name: "Visa Premium", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 8, name: "Visa Mini-Tag (Sticker)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 9, name: "Visa Gold (White face)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 10, name: "Visa Infinite", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 11, name: "Visa Business", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 12, name: "Visa Junior (BARS)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 13, name: "Visa Junior (KIDS)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 14, name: "Заготовки Элкарт в МПЦ", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 86164 },
    { id: 15, name: "Visa Gold (конверты)", group: "Эмиссия", status: "BAD", priority: 1, quantity: 88500, additional_info: "ручной подсчет" },
    { id: 16, name: "Visa Premium (конверты)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 17, name: "Visa Islamic finance (конверты)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 18, name: "Visa Business (конверты)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 19, name: "Visa Infinite (конверты)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 20, name: "Visa Junior (конверты)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 88500 },
    { id: 21, name: "Visa Gold KGS (Virtual)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 19386, additional_info: "ручной подсчет или с ТГ, который сделали УИТ для УКЦ" },
    { id: 22, name: "Visa Gold KGS VID (Virtual)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 19386 },
    { id: 23, name: "Visa Gold KGS Nerez (Virtual)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 19386 },
    { id: 24, name: "Visa Gold RUB (Virtual)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 19386 },
    { id: 25, name: "Visa Gold RUB Nerez (Virtual)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 19386 },
    { id: 26, name: "Visa Gold EUR (Virtual)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 19386 },
    { id: 27, name: "Visa Gold EUR Nerez (Virtual)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 19386 },
    { id: 28, name: "Visa Gold USD (Virtual)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 19386 },
    { id: 29, name: "Visa Gold USD Nerez (Virtual)", group: "Эмиссия", status: "GOOD", priority: 3, quantity: 19386 },
    { id: 30, name: "Сертификат Payler", group: "Сопровождение", status: "GOOD", priority: 3, quantity: "Годен с: 28/03/2024", deadline: "3/28/2028" },
    { id: 31, name: "Visa (Мониторинг карточных операций)", group: "Сопровождение", status: "BAD", priority: 1, quantity: null, additional_info: "отображается за последнюю неделю, с возможность выбора диапозона времени по дате и времени" },
    { id: 32, name: "Элкарт МПЦ (Мониторинг карточных операций)", group: "Сопровождение", status: "BAD", priority: 1, quantity: null },
    { id: 33, name: "Visa (SMS сервис)", group: "Сопровождение", status: "NORMAL", priority: 2, quantity: null, additional_info: "отображается за последнюю неделю, с возможность выбора диапозона времени по дате и времени" },
    { id: 34, name: "Элкарт МПЦ (SMS сервис)", group: "Сопровождение", status: "NORMAL", priority: 2, quantity: null },
    { id: 35, name: "VRM алерты на высокорисковые правила - VISA", group: "Сопровождение", status: "BAD", priority: 1, quantity: null },
    { id: 36, name: "Payler алерты на высокорисковые правила - ИЭ", group: "Сопровождение", status: "BAD", priority: 1, quantity: null },
    { id: 37, name: "МПЦ алерты на высокорисковые правила - Элкарт", group: "Сопровождение", status: "BAD", priority: 1, quantity: null },
    { id: 38, name: "Visa (Мандаты)", group: "Сопровождение", status: "GOOD", priority: 3, quantity: null, deadline: "3/10/2025" },
    { id: 39, name: "ПЦ CSI (Мандаты)", group: "Сопровождение", status: "BAD", priority: 1, quantity: null, deadline: "7/11/2024", additional_info: "ожидание новых сроков" },
    { id: 40, name: "МПЦ (Мандаты)", group: "Сопровождение", status: "NORMAL", priority: 2, quantity: null, deadline: "11/5/2024" },
    { id: 41, name: "Фактура (Мандаты)", group: "Сопровождение", status: "GOOD", priority: 3, quantity: null, deadline: "3/10/2025" },
    { id: 42, name: "Пейлер (Мандаты)", group: "Сопровождение", status: "GOOD", priority: 3, quantity: null, deadline: "3/11/2025" },
    { id: 43, name: "РБС (Мандаты)", group: "Сопровождение", status: "GOOD", priority: 3, quantity: null, deadline: "5/5/2025" },
    { id: 44, name: "НБКР (Мандаты)", group: "Сопровождение", status: "GOOD", priority: 3, quantity: null, deadline: "5/5/2025" },
    { id: 45, name: "VRPT (Visa Fraud Monitoring Program)", group: "Сопровождение", status: "BAD", priority: 1, quantity: "Этапы" },
    { id: 46, name: "VROL (Visa Fraud Monitoring Program)", group: "Сопровождение", status: "BAD", priority: 1, quantity: "Количество" },
    { id: 47, name: "Approval rate Visa", group: "Сопровождение", status: "NORMAL", priority: 2, quantity: "95%", additional_info: "65%" },
    { id: 48, name: "Rate threshold Visa", group: "Сопровождение", status: "NORMAL", priority: 2, quantity: 13243234, additional_info: "33000000" }
];

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token); // Если токен есть, то пользователь авторизован
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // Удаляем токен из localStorage
        setIsAuthenticated(false); // Меняем состояние на неавторизованного пользователя
        navigate('/login'); // Перенаправляем на страницу логина
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {isAuthenticated ? (
                    <button onClick={handleLogout}>Quit</button> // Кнопка для выхода
                ) : (
                    <Link to="/login">Login</Link> // Кнопка для входа
                )}
            </div>
        </nav>
    );
};

export default Navbar;

