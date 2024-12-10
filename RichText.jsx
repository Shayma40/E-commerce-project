import { Box, Typography } from '@mui/material';
import React from 'react';

const RichText = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#EFECEC',
        color: '#505655',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '70px 20px',
        boxSizing: 'border-box',
        zIndex: 1,
      }}
    >
      <Typography variant="h1" sx={{
        fontFamily: 'Playfair Display',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginTop: '10px',
        position: 'relative',
        overflow: 'hidden',
        animation:'slideIn 1.5s ease-out forwards',
        '&::before': {
          content: '"Dare To Be Diffrent"',
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'transparent',
          textShadow:`
            1px 1px 0 rgba(255, 255, 255, 0.5),   
            2px 2px 0 rgba(0, 0, 0, 0.2),        
            3px 3px 0 rgba(37, 37, 37, 0.5),  
            0 0 10px rgba(255, 165, 0, 0.6)
          `,
          zIndex: -1,
          animation: 'flicker 3s infinite',
        },
      }}
      >
        Dare To Be Diffrent
      </Typography>
      <style>
        {`
          @keyframes slideIn {
            0% {
              transform: translateX(-100%);
            }
            50%{
              transform: translateX(10%);
            }
            100% {
              transform: translateX(0);
            }
          }
          @keyframes flicker {
            0%,100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}
      </style>
    </Box>
  );
};

export default RichText;