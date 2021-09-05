import React from 'react'
import Moment from 'react-moment'

function FormattedDate({ date, format = 'MM/DD/YYYY hh:mm:ss A', }) {
    return (
        <Moment format={format}>{date}</Moment>
    )
}

export default FormattedDate
