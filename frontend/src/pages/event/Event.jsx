import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EventCard from '../../components/EventCard'
import axios from 'axios'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'

const Event = () => {
    const {eventId} = useParams()
    console.log(eventId)
    const [loading, setLoading] = useState(true)
    const [eventData, setEventData] = useState({})
    const fetchEventById = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/v1/event/view-event/${eventId}`)
            if (response?.data?.statusCode === 200) {
                setEventData(response?.data?.data)
            }
            setLoading(false)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false)
        }
    }
    console.log(eventData)

    useEffect(() => {
        fetchEventById()
    }, [eventId])
    return (
        <div className='flex items-center justify-center  h-screen w-full'>
            {loading ? <Loader /> : <EventCard data={eventData} />}

        </div>
    )
}

export default Event
