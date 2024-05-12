import React, { useState, useEffect } from 'react';

const Cookies = () => {
    const [cookiesData, setCookiesData] = useState({
        firstParty: 0,
        thirdParty: 0,
        sessionCookies: 0,
        persistentCookies: 0
    });

    // Simulando a coleta de dados de cookies
    useEffect(() => {
        // Essa função seria substituída pela lógica real de detecção de cookies
        const fetchCookiesData = () => {
            // Simulação de dados recebidos
            const data = {
                firstParty: 5, // 5 cookies de primeira parte
                thirdParty: 15, // 15 cookies de terceira parte
                sessionCookies: 10, // 10 cookies de sessão
                persistentCookies: 10 // 10 cookies persistentes
            };
            setCookiesData(data);
        };

        fetchCookiesData();
    }, []);

    return (
        <div>
            <h1>Manage Your Cookies Preferences</h1>
            <div>
                <p>First Party Cookies: {cookiesData.firstParty}</p>
                <p>Third Party Cookies: {cookiesData.thirdParty}</p>
                <p>Session Cookies: {cookiesData.sessionCookies}</p>
                <p>Persistent Cookies: {cookiesData.persistentCookies}</p>
            </div>
        </div>
    );
}

export default Cookies;
