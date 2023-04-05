import {
  ConnectWallet,
  useAcceptDirectListingOffer,
  useAddress,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react"
import type { NextPage } from "next"
import { useState } from "react"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  //contract 연결
  const myAddress = useAddress()
  const contractAddress = "0x283c980C6E17c345a0Bbe74a0bB004712684354F"
  const { contract, isLoading } = useContract(contractAddress)

  //react hook이라는 기술
  //setCounter함수가 쓰이면 counter가 바뀜
  const [counter, setCounter] = useState<string | undefined>(undefined)

  async function getCounter() {
    if (!contract) return

    const counter = await contract.call("getCounter")
    setCounter(counter.toString())
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.connect}>
          <ConnectWallet />
        </div>
        <p>My Address : {myAddress}</p>
        <h1>Counter Dapp</h1>
        <h3>{counter}</h3>

        <Web3Button
          contractAddress={contractAddress}
          action={() => getCounter()}
        >
          Refresh Counter
        </Web3Button>
        <br />
        <Web3Button
          contractAddress={contractAddress}
          action={(contract) => contract.call("incrementCounter")}
        >
          +
        </Web3Button>
      </main>
    </div>
  )
}

export default Home
