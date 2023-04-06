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
  const contractAddress = "0xDd0fC47fEcdF84275DFc61163C3aD00A2787738D"
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
        <div className={styles.title}>
          <h1>어영민의 카운터 앱</h1>
        </div>
        <div className={styles.description}>
          Contract address : {contractAddress} <br />
          Host address: 0xf77f6575B3E87F16669c37a0757635fCa6C13AAa <br />
          Your address: 0x0B371cBa193FDd65E4E7Fd20fe317f0189b3a106 <br />
        </div>

        <div className={styles.title}>
          <h3>{counter}</h3>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => {
                contract.call("decrementCounter")
              }}
            >
              <h1>-</h1>
            </Web3Button>
          </div>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => getCounter()}
            >
              <h1>Refresh Counter</h1>
            </Web3Button>
          </div>
          <br />
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => {
                contract.call("incrementCounter")
              }}
            >
              <h1>+</h1>
            </Web3Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
