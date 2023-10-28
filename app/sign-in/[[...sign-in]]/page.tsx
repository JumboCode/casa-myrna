import { SignIn } from "@clerk/nextjs";
import { AppProps } from "next/app";
import React from "react";
import Image from "next/image";
import logo from "app/images/logo.svg";

function MyApp({ pageProps }: AppProps) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%), linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%)",
        height: "750px",
        justifyContent: "center",
        alignItems: "center",
        className: "background",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "100px",
        }}
      >
        <Image src={logo} alt="Error" />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignIn
          appearance={{
            elements: {
              justifyContent: "center",
              formButtonPrimary: {
                fontSize: 80,
                textTransform: "none",
                backgroundColor: "#611BBD",
                "&:hover, &:focus, &:active": {
                  backgroundColor: "#49247A",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default MyApp;
