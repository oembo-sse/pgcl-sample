import { SVGProps } from "react";

export const LeanLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={300}
    height={150}
    viewBox="0 0 240 120"
    {...props}
  >
    <defs>
      <clipPath id="a" clipPathUnits="userSpaceOnUse">
        <path
          d="M13.185 8.904h754.178V309.52H13.185z"
          style={{
            fill: "#00f",
            fillRule: "evenodd",
            stroke: "#000",
            strokeWidth: ".80000001px",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeOpacity: 1,
          }}
        />
      </clipPath>
    </defs>
    <g clipPath="url(#a)" transform="matrix(.30563 0 0 .25971 2.277 14.143)">
      <path
        d="M323.28 166.52H179.981v-6.329H323.28V31.144H176.826v-5.937h152.781v276.687H24.727V25.211h6.34v270.787h292.212zM554.586 301.894V37.488l182.875 264.406h6.328V25.304h-5.937v265.512L553.789 25.303h-5.53v276.591Z"
        style={{
          fill: "#000",
          fillOpacity: 1,
          stroke: "none",
        }}
      />
      <path
        d="M493.91 342.715 529 426.5l35.252-83.752M511.62 385.545h34.93"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: 2,
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          strokeOpacity: 1,
        }}
        transform="matrix(3.1922 0 0 3.1922 -1250.002 -1067.559)"
      />
    </g>
    <script />
  </svg>
);
