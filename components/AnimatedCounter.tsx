"use client"

import CountUp from "react-countup"

const AnimatedCounter = ({amount}:{amount:number}) => {
  return (
    <div className='total-balance-amount gap-2'>
        <CountUp 
        duration={3}
        decimals={2}
        decimal=","
        prefix="$"
        end={amount}/>
    </div>
  )
}

export default AnimatedCounter