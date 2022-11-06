import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Container,
  Button,
  Card,
  StylesProvider,
  LinearProgress,
} from '@material-ui/core'
import { myApiKey } from '../../APIKEYS'
import Days from './Days'
import { NFTStorage, File } from 'nft.storage'
import './SaveStreetVendorData.css'

function SaveStreetVendorData({
  contract,
  username,
  bio,
  category,
  coverPhoto,
  image,
}) {
  const history = useHistory()
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [ownerWalletAddress, setOwnerWalletAddress] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const hours = [
    { day: 'Mond', hours: '' },
    { day: 'Tuesd', hours: '' },
    { day: 'Wed', hours: '' },
    { day: 'Thursd', hours: '' },
    { day: 'Frid', hours: '' },
    { day: 'Sat', hours: '' },
    { day: 'Sund', hours: '' },
  ]

  const setHours = (newHours, index) => {
    hours[index].newHours = newHours
  }

  const getDay = async () => {
    let d = new Date()
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${mo}-${da}-${ye}`
  }

  const sendDataToNftStorage = async () => {
    const creationDate = await getDay()
    const obj = {
      category: category,
      location: location,
      coverPhoto: coverPhoto,
      creationDate,
      description: bio,
      image: image,
      organizer: ownerWalletAddress,
      targetAmmount: '1000',
      title: username,
      neighborhood: neighborhood,
      hours: hours,
    }
    const client = new NFTStorage({ token: myApiKey })
    const metadata = await client.store({
      name: username,
      description: JSON.stringify(obj),
      image: new File([image], 'imageName', { type: 'image/*' }),
    })
    console.log('metadata', metadata)

    if (metadata) {
      console.log('metadata URL', metadata?.url)
      const partURL = metadata?.partURL.substring(7)
      const completeURL = `https://cloudflare-ipfs.com/ipfs/${partURL}`
      const targetAmmount = '100'

      const saveToContract = await contract.createGroup(completeURL, '100')
      const tx = await saveToContract.wait()
      history.push('/')
    }
  }


  return (
    <StylesProvider injectFirst>
      <Container
        className="root-pet-details"
        style={{ minHeight: '50vh', paddingBottom: '3rem' }}
      >
        <center>
          <Card
            style={{
              maxWidth: '500px',
              padding: '2rem',
              paddingBottom: '3rem',
              borderRadius: '13px',
              textAlign: 'start',
            }}
          >
            <div className="">
              <Button
                className="whiteLink-no-active"
                component={Link}
                to="/create"
              >
                Appearance
              </Button>

              <Button className="whiteLink" component={Link} to="/create-links">
                Details
              </Button>
            </div>
            <br />

            <hr style={{ border: '1px solid #ccc' }} />
            <br />

            {/*Location*/}
            <p>
              <label htmlFor="fname">Location</label>
            </p>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="123 Broadway Ave New York, NY, 1002"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="create-profile-input"
            ></input>
            <br />
            <br />

            {/*Owner Wallet Address*/}
            <p>
              <label htmlFor="fname">Owner Wallet Address</label>
            </p>
            <input
              type="text"
              id="fname"
              name="ownerWalletAddress"
              placeholder="0x123..."
              className="create-profile-input"
              value={ownerWalletAddress}
              onChange={(e) => setOwnerWalletAddress(e.target.value)}
            ></input>
            <br />
            <br />

            {/* Neighborhood*/}
            <p>
              <label htmlFor="fname">Neighborhood</label>
            </p>
            <input
              type="text"
              id="neighborhood"
              name="neighborhood"
              placeholder="Upper East Side"
              className="create-profile-input"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            ></input>
            <br />
            <br />

            {/* Business Hours */}
            <p style={{ paddingBottom: '0.5rem' }}>
              <label htmlFor="fname">Business Hours</label>
            </p>
            {/* Business Hours Labels*/}
            <div style={{ display: 'flex' }}>
              <p style={{ width: '100%' }}>
                <label htmlFor="fname">Day</label>
              </p>
              <p style={{ width: '100%' }}>
                <label htmlFor="fname">Hours</label>
              </p>
            </div>
            {/* Business Hours per day*/}
            {hours?.map((ele, index) => (
              <Days key={index} setHours={setHours} index={index} ele={ele} />
            ))}
            <br />
            <br />

            <hr style={{ border: '1px solid #ccc' }} />
            <br />
            <br />
            {loading ? (
              <div className="">
                <LinearProgress />
              </div>
            ) : (
              ''
            )}

            <br />
            <center>
              <Button className="whiteLink" component={Link} to="/">
                Nevermind
              </Button>
              <Button
                className="phase-btn"
                variant="contained"
                onClick={sendDataToNftStorage}
              >
                Save
              </Button>
            </center>
          </Card>
        </center>
      </Container>
    </StylesProvider>
  )
}

export default SaveStreetVendorData
