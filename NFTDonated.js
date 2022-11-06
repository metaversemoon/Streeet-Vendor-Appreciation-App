import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import React, { useState, useEffect } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material'

function NFTDonated({
  isUserLocked,
  requestFollow,
  lockedProfile,
  selectedProfile,
  visitSite,
  currentAccount,
}) {
  const [covalentAllData, setCovalentAllData] = useState(null)
  const [contractDetails, setContractDetails] = useState(null)
  const [nfts, setNfts] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const dataPie = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Most use Contracts and its Networks',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const retriveCovalentNfts = async () => {
    if (!currentAccount) {
      alert('Please connect your wallet to the right network!')
      return
    }

    try {
      const chain_id = 1666700000
      const contractData = await fetch(
        `https://api.covalenthq.com/v1/${chain_id}/tokens/0xf8F1C045b730f918527D6257f02c4b77c57c6518/nft_transactions/1/?quote-currency=USD&format=JSON&key=ckey_b99d092c1fb646d09d4aa211505`,
      )
      const contractDataJson = await contractData.json()

      const nfts = await fetch(
        'https://api.covalenthq.com/v1/137/address/0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_b99d092c1fb646d09d4aa211505',
      )

      const allNFTS = await nfts.json()

      if (allNFTS) {
        const allData = allNFTS?.data?.items[1]
        const onlyNFTs = allData?.nft_data
        setNfts(onlyNFTs)
        setItems(allNFTS?.data?.items)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllTransactionByContract = async () => {
    try {
      //  Gets All Tokens by Wallet Adddress from Harmony
      const contractDetails = await fetch(
        `https://api.covalenthq.com/v1/1666700000/tokens/0xf8F1C045b730f918527D6257f02c4b77c57c6518/nft_transactions/1/?quote-currency=USD&format=JSON&key=ckey_b99d092c1fb646d09d4aa211505`,
      )
      const contractDetailsJson = await contractDetails.json()
      console.log('contractDetailsJson', contractDetailsJson.data.items)
      setContractDetails(contractDetailsJson)

      //  Gets All NFTs by address
      const nfts = await fetch(
        'https://api.covalenthq.com/v1/137/address/0x11760DB13aE3Aa5Bca17fC7D62172be2A2Ea9C11/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_b99d092c1fb646d09d4aa211505',
      )

      // let allNFTS = await nfts.json()
      const covalentAllData = await nfts.json()
      setCovalentAllData(covalentAllData)

      const covalentContractsItems = await covalentAllData.data.items

      const nftDataArray = covalentContractsItems.map((contract) =>
        contract.balance.slice(0, 4),
      )

      const contractNamesLabels = covalentContractsItems.map(
        (contract) => contract.contract_name,
      )

      dataPie.labels = contractNamesLabels
      dataPie.datasets[0].data = nftDataArray
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    retriveCovalentNfts()
    fetchAllTransactionByContract()
  }, [])

  return (
    <div>
      {loading ? (
        <CircularProgress style={{ marginTop: '1rem' }} />
      ) : (
        <TableContainer component={Paper}>
          <br />
          <p
            style={{
              float: 'left',
              paddingLeft: '.8rem',
              color: 'gray',
              fontSize: '.9rem',
            }}
          >
            NFTs donated to this wallet address{' '}
            <strong>powered by Covalent.</strong>
          </p>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#dfd8d8' }}>
                <TableCell>Image</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {nfts &&
                nfts.map((legislator, key) => {
                  let overallRating, overallBlkRating
                  if (legislator.AverageRating) {
                    overallRating = legislator.overallRating
                  }
                  if (legislator.AverageBLKRating) {
                    overallBlkRating = legislator.overallBlkRating
                  }
                  return (
                    <TableRow key={key}>
                      <TableCell>
                        <img
                          src={legislator.external_data.image}
                          style={{ width: '100px' }}
                          alt=""
                        />
                      </TableCell>

                      <TableCell>{legislator.token_id}</TableCell>

                      <TableCell className="line-break">
                        {legislator.external_data.name}
                      </TableCell>

                      <TableCell align="center">
                        <a
                          href={`https://explorer.pops.one/address/0xf4ea652f5b7b55f1493631ea4afaa63fe0acc27c?activeTab=0`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ArrowForwardIosIcon
                            fontSize="large"
                            style={{ color: 'blue' }}
                          />
                        </a>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default NFTDonated
