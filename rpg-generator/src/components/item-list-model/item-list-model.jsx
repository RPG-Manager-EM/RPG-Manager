import React from 'react'

import { Paper } from '@mui/material';

const ItemListModel = (props) => {
    return (
        <Paper className='flex justify-around p-4 cursor-pointer transition duration-300 hover:opacity-95 hover:transition hover:duration-300' sx={{ borderLeft: '10px solid', borderColor: 'secondary.main' }}>
            {props.children}
        </Paper>
    )
}

export default ItemListModel