import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = { firstName: "Hussein", lastName: "Alkattash", email:"hussein@gmail.com" };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.35}/>
        </header>
        Resent Transactions
      </div>
      <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance:125.50}, {currentBalance:500.50}]}/>
    </section>
  );
};

export default Home;
