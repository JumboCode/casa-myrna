import { ClerkProvider, SignIn } from "@clerk/nextjs";
import { AppProps } from "next/app";
import React from "react";

function MyApp({ pageProps }: AppProps) {
  return (
    <div style={{background: 'linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%), linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%)', 
          height: '750px', 
          border:'0'}}>
         <ClerkProvider {...pageProps}>
            <>
            <SignIn
              appearance={{
                elements: {
                  justifyContent: "center",
                  formButtonPrimary: {
                    fontSize: 30,
                    textTransform: "none",
                    backgroundColor: "#611BBD",
                    "&:hover, &:focus, &:active": {
                      backgroundColor: "#49247A",
                    },
                  },
                },
              }}
            />
            </>
      </ClerkProvider>

    </div>
  );
}
 
export default MyApp;


/* Rectangle 34 */

// position: absolute;
// width: 1280px;
// height: 749px;
// left: 0px;
// top: 105px;

/* Rectangle 32 */

// position: absolute;
// width: 636px;
// height: 442px;
// left: 322px;
// top: 195px;

// background: #FFFFFF;
// border-radius: 61px;


// background: linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%), linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%);
