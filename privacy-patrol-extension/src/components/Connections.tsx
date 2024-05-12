import React, { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';

const Connections = () => {
  const [connectionCounts, setConnectionCounts] = useState({
    thirdParty: 0,
    firstParty: 0
  });

  useEffect(() => {
    const getConnectionCounts = async () => {
      try {
        const response = await browser.runtime.sendMessage({
          action: "getConnectionCounts"
        });
        setConnectionCounts({
          thirdParty: response.thirdPartyConnectionAttempts,
          firstParty: response.suspiciousRedirects
        });
      } catch (error) {
        console.error("Erro ao receber dados:", error);
      }
    };

    getConnectionCounts(); // Chamada da função aqui dentro do useEffect
  }, []);


  return (
    <div>
      <h1>Network Connections</h1>
      <p>Third Party Connections: {connectionCounts.thirdParty}</p>
      <p>First Party Connections: {connectionCounts.firstParty}</p>
    </div>
  );
};

export default Connections;
