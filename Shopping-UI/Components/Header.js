import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
background: #9F3434;
  position: relative; /* Ensure container is positioned relatively */
  width: 100%; /* Set width to 100% of the parent/container width */
  height: 100vh; /* Set height to 100% of the viewport height */
  
  #header-mountain-svg, #header-logo {
    position: absolute; /* Position both SVGs absolutely */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #header-logo {
    z-index: 1; /* Ensure the logo is on top */
  }

  /* Media queries for responsiveness */
  @media (min-width: 1200px) {
    height: 80vh; /* Adjust height for larger screens */
  }

  @media (max-width: 768px) {
    height: 60vh; /* Adjust height for smaller screens */
  }

  @media (max-width: 480px) {
    height: 50vh; /* Adjust height for very small screens */
  }
`;



export function Header() {
useEffect(() => {
console.log(window.innerWidth);
}, [])	
	return(
<StyledHeader>
<svg id="header-mountain-svg" svg version="1.0" xmlns="http://www.w3.org/2000/svg"
width="770.000000pt" height="650.000000pt" viewBox="-60 0 700.000000 550.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,470.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M2630 4259 c-704 -81 -1311 -550 -1573 -1214 -58 -149 -95 -302 -122
-517 l-6 -48 -290 0 -289 0 0 -25 0 -25 2500 0 2500 0 0 25 0 25 -290 0 -289
0 -5 33 c-3 17 -8 57 -11 87 -42 381 -233 778 -514 1072 -274 286 -594 468
-972 552 -201 44 -442 57 -639 35z m555 -67 c388 -75 745 -267 1010 -543 195
-203 334 -432 425 -694 41 -120 83 -310 93 -418 l6 -58 -37 3 c-33 3 -37 6
-39 33 -25 300 -148 628 -331 884 -527 736 -1536 965 -2327 528 -341 -188
-621 -489 -776 -833 -73 -163 -140 -417 -151 -569 -3 -38 -4 -40 -41 -43 l-38
-3 6 53 c20 165 63 347 115 482 249 642 815 1093 1500 1192 134 19 451 11 585
-14z m-157 -83 c535 -58 1014 -352 1304 -799 140 -215 233 -460 268 -706 24
-162 66 -200 -513 459 -32 37 -64 67 -69 67 -6 0 -37 -16 -70 -36 -34 -21 -63
-33 -67 -27 -3 5 -95 118 -203 250 l-197 241 -92 -20 c-92 -20 -93 -20 -108 0
-46 58 -364 412 -369 412 -4 -1 -164 -182 -357 -405 -192 -222 -355 -404 -361
-404 -5 -1 -63 37 -127 83 l-116 85 -112 -125 c-109 -122 -112 -124 -145 -118
-19 3 -40 7 -47 8 -7 0 -122 -120 -256 -269 -134 -148 -257 -283 -273 -300
l-30 -30 6 81 c7 91 52 283 92 394 36 101 126 279 187 370 166 250 419 475
679 606 211 106 383 155 653 187 67 8 232 6 323 -4z m-173 -449 l-46 -135 75
-71 c42 -39 76 -74 76 -78 0 -3 -37 -5 -81 -4 l-82 3 -67 -111 -67 -112 23
-152 c13 -84 25 -154 27 -157 3 -2 60 59 128 136 68 77 128 140 133 140 5 1
58 -44 117 -100 123 -114 110 -118 130 36 7 50 15 93 18 97 3 4 29 -10 56 -31
28 -20 79 -58 115 -83 l66 -47 -13 192 c-6 106 -14 213 -16 240 -2 26 -1 47 2
47 3 0 87 -95 186 -211 186 -219 393 -491 376 -497 -5 -2 -35 4 -67 12 -32 8
-59 14 -61 13 -1 -2 33 -38 76 -81 l78 -77 83 10 84 11 166 -77 c91 -42 169
-81 174 -85 6 -4 -762 -8 -1704 -8 l-1715 0 265 265 265 265 48 -9 47 -8 53
66 c29 36 68 85 86 109 19 24 35 41 37 39 2 -2 -14 -55 -36 -117 -35 -96 -57
-137 -144 -264 -56 -83 -106 -157 -110 -164 -4 -7 35 14 87 47 51 34 103 61
114 61 11 0 66 -9 122 -21 57 -11 104 -19 106 -17 1 1 -1 32 -6 67 -5 35 -8
66 -6 67 2 2 75 22 163 45 87 23 163 45 167 49 4 4 -24 31 -63 60 -39 30 -69
58 -68 62 5 14 643 724 646 718 1 -3 -18 -66 -43 -140z"/>
<path d="M357 1283 c-4 -3 -7 -15 -7 -25 0 -17 21 -18 464 -18 l464 0 70 -87
c655 -819 1842 -963 2677 -324 91 69 249 225 327 324 l70 87 465 0 464 0 -3
23 -3 22 -2491 3 c-1370 1 -2494 -1 -2497 -5z m1113 -89 c96 -123 300 -296
467 -395 558 -329 1268 -329 1826 0 169 100 354 256 458 386 41 51 47 55 86
55 24 0 43 -3 43 -6 0 -14 -136 -168 -212 -239 -357 -336 -802 -514 -1285
-515 -565 -1 -1086 246 -1456 691 -26 31 -44 59 -40 62 3 4 22 7 42 7 31 -1
41 -8 71 -46z m2741 28 c-20 -37 -251 -250 -341 -315 -109 -77 -337 -194 -455
-233 -229 -75 -471 -105 -698 -86 -425 36 -789 200 -1093 494 -69 67 -130 130
-135 140 -9 17 38 18 1361 18 1312 0 1370 -1 1361 -18z"/>
</g>
</svg>
<svg id="header-logo" svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="430.000000pt" height="83.000000pt" viewBox="-175 -15 700.000000 83.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,83.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M1146 758 c-8 -18 -57 -132 -110 -252 -53 -120 -96 -220 -96 -222 0
-2 25 -4 56 -4 l56 0 26 60 27 60 100 0 100 0 19 -48 c11 -26 23 -53 29 -59
10 -14 117 -18 117 -5 -1 4 -50 117 -109 252 l-108 245 -47 3 c-44 3 -47 2
-60 -30z"/>
<path d="M2980 768 c-56 -29 -90 -78 -90 -130 0 -80 45 -123 160 -153 85 -22
100 -31 100 -60 0 -29 -26 -45 -72 -45 -35 0 -111 31 -122 49 -12 20 -30 12
-60 -26 l-30 -36 34 -28 c100 -84 283 -77 338 13 27 44 29 112 4 153 -20 32
-75 61 -177 92 -52 16 -60 21 -60 43 0 51 67 59 147 19 21 -11 39 -19 42 -19
3 0 17 17 30 37 24 34 24 38 9 55 -23 25 -116 58 -166 58 -24 0 -62 -10 -87
-22z"/>
<path d="M30 730 l0 -50 75 0 75 0 2 -197 3 -198 55 0 55 0 3 198 2 197 76 0
75 0 -3 48 -3 47 -207 3 -208 2 0 -50z"/>
<path d="M502 533 l3 -248 55 0 55 0 0 103 c0 98 1 102 17 83 9 -12 27 -21 40
-21 19 0 43 -33 149 -203 l125 -202 62 -3 c37 -2 62 1 62 7 0 6 -58 101 -128
213 l-128 203 30 20 c45 29 80 104 71 153 -9 58 -38 97 -87 121 -39 18 -62 21
-186 21 l-142 0 2 -247z m268 134 c19 -9 26 -22 28 -49 4 -52 -23 -68 -113
-68 l-70 0 3 65 4 65 61 0 c34 0 73 -6 87 -13z"/>
<path d="M1391 772 c2 -4 49 -117 104 -250 l99 -242 47 0 46 0 98 238 c53 130
100 243 102 250 4 9 -11 12 -55 12 l-60 0 -61 -156 c-34 -86 -61 -161 -61
-167 0 -24 -16 11 -75 160 l-61 158 -63 3 c-35 2 -61 -1 -60 -6z"/>
<path d="M1950 530 l0 -250 190 0 190 0 0 55 0 55 -135 0 -135 0 0 48 0 47
117 0 118 0 0 50 0 50 -117 3 -118 3 0 44 0 44 133 3 132 3 0 45 0 45 -187 3
-188 2 0 -250z"/>
<path d="M2412 533 l3 -248 53 -3 52 -3 1 108 c0 101 1 107 16 86 9 -14 26
-23 42 -23 22 -1 34 -14 76 -81 27 -45 54 -83 61 -86 6 -2 36 -3 67 -1 l56 3
-58 91 -59 91 30 17 c45 27 68 72 68 134 0 63 -18 98 -68 132 -33 23 -45 25
-189 28 l-153 3 2 -248z m284 122 c20 -27 17 -62 -6 -85 -16 -16 -33 -20 -95
-20 l-75 0 0 66 0 66 81 -4 c66 -3 83 -7 95 -23z"/>
<path d="M1070 166 c0 -8 10 -40 22 -71 24 -64 45 -69 63 -16 l11 34 10 -34
c7 -23 16 -34 28 -34 15 0 25 16 42 68 l23 68 -21 -3 c-14 -2 -25 -15 -33 -37
l-11 -34 -10 34 c-14 48 -39 49 -55 2 l-13 -38 -9 38 c-6 26 -14 37 -28 37
-10 0 -19 -6 -19 -14z"/>
<path d="M2650 160 c0 -11 7 -20 15 -20 11 0 15 -12 15 -50 0 -43 3 -50 20
-50 17 0 20 7 20 50 0 38 4 50 15 50 10 0 15 -10 15 -30 0 -63 75 -93 118 -47
28 30 28 68 -1 95 -28 26 -64 28 -89 5 -17 -15 -18 -15 -18 0 0 14 -10 17 -55
17 -48 0 -55 -2 -55 -20z"/>
</g>
</svg>

</StyledHeader>
   )
}
