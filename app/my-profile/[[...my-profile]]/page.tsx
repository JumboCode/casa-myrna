// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';


// export default function Profile(){ return
//     <div>
//     <Container maxWidth="sm">
//         <Box sx={{ bgcolor: '#aaaaaa', height: '100vh' }} />
//       </Container>
//     </div>

// };

import * as React from 'react';
import Box from '@mui/material/Box';
import { ClientReferenceManifestPlugin } from 'next/dist/build/webpack/plugins/flight-manifest-plugin';
import { grey } from '@mui/material/colors'; //imports grey series from materialUI website

const color = grey[200]; //establishes where on the grey scale so we can use it later!
const hoverColor = grey[300]; //variable for darker shade that happens when yu hover!

export default function BoxSx() {
  return (
    <Box
      sx={{
        display: 'flex',
        //width: '50vw', 
        //height : "50vh",
        minHeight: "90vh",
        justifyContent: "center",
        alignItems:"center",
        borderRadius: '5%', //makes rounded corners
        backgroundColor: color, //color is variable established above! (grey!)
        '&:hover': {
          backgroundColor: hoverColor,
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    > </Box>
  );
}