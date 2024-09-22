import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Home = async () => {
  const user = await getLoggedInUser();
  if (!user) redirect("/sign-in");
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={user?.name || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.35}/>
        </header>
        Resent Transactions
      </div>
      <RightSidebar user={user} transactions={[]} banks={[{currentBalance:125.50}, {currentBalance:500.50}]}/>
    </section>
  );
};

export default Home;
